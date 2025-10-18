import os
from flask import Flask, session, request, redirect, render_template, jsonify
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import time
import logging

# Configurar logging
logging.basicConfig(level=logging.DEBUG)

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)
app.secret_key = os.urandom(24)

# Scope COMPLETO necesario para el Web Playback SDK
SCOPE = "streaming user-read-playback-state user-modify-playback-state user-read-private user-read-email user-read-currently-playing"

# Configuración de Spotipy
sp_oauth = SpotifyOAuth(
    client_id=os.getenv("SPOTIPY_CLIENT_ID"),
    client_secret=os.getenv("SPOTIPY_CLIENT_SECRET"),
    redirect_uri=os.getenv("SPOTIPY_REDIRECT_URI"),
    scope=SCOPE,
    cache_path=".spotify_cache",
    show_dialog=True
)

def get_spotify_client():
    """Obtiene un cliente de Spotipy autenticado desde la sesión."""
    token_info = session.get('token_info', None)
    
    if not token_info:
        app.logger.debug("No token info found in session")
        return None, None
    
    # Verificar si el token está expirado
    now = int(time.time())
    is_expired = token_info['expires_at'] - now < 60
    
    if is_expired:
        app.logger.debug("Token expired, refreshing...")
        try:
            token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
            session['token_info'] = token_info
            app.logger.debug("Token refreshed successfully")
        except Exception as e:
            app.logger.error(f"Error refreshing token: {e}")
            return None, None

    sp = spotipy.Spotify(auth=token_info['access_token'])
    return sp, token_info

@app.route('/')
def index():
    app.logger.debug("Index route accessed")
    token_info = session.get('token_info', None)
    
    if not token_info:
        app.logger.debug("No token, redirecting to auth")
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    
    sp, token_info = get_spotify_client()
    if not sp:
        app.logger.debug("Invalid client, clearing session")
        session.clear()
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)

    try:
        # Obtener dispositivos disponibles
        devices = sp.devices()
        app.logger.debug(f"Available devices: {devices}")
        
        return render_template(
            'index.html', 
            devices=devices.get('devices', []), 
            search_results=[],
            access_token=token_info['access_token']
        )
    except Exception as e:
        app.logger.error(f"Error getting devices: {e}")
        session.clear()
        return redirect('/')

@app.route('/callback')
def callback():
    try:
        code = request.args.get('code')
        app.logger.debug(f"Callback received with code: {bool(code)}")
        
        if not code:
            return "Error: No se recibió código de autorización", 400
            
        token_info = sp_oauth.get_access_token(code)
        session['token_info'] = token_info
        app.logger.debug("Token stored in session successfully")
        return redirect('/')
    except Exception as e:
        app.logger.error(f"Error in callback: {e}")
        return f"Error en la autenticación: {str(e)}", 400

@app.route('/search', methods=['POST'])
def search():
    sp, token_info = get_spotify_client()
    if not token_info:
        return redirect('/')

    try:
        query = request.form['query']
        app.logger.debug(f"Searching for: {query}")
        search_results = sp.search(q=query, type='track', limit=10)
        
        devices = sp.devices()
        app.logger.debug(f"Devices during search: {devices}")
        
        return render_template(
            'index.html', 
            devices=devices.get('devices', []), 
            search_results=search_results['tracks']['items'],
            access_token=token_info['access_token']
        )
    except Exception as e:
        app.logger.error(f"Search error: {e}")
        session.clear()
        return redirect('/')

@app.route('/api/play', methods=['POST'])
def api_play():
    sp, token_info = get_spotify_client()
    if not token_info:
        return jsonify({'error': 'No autenticado'}), 401
    
    try:
        data = request.json
        track_uri = data.get('track_uri')
        app.logger.debug(f"API Play request for track: {track_uri}")
        
        # Primero, obtener dispositivos disponibles
        devices = sp.devices()
        app.logger.debug(f"Available devices: {devices}")
        
        # Buscar un dispositivo activo
        active_devices = [device for device in devices.get('devices', []) 
                         if device.get('is_active', False)]
        
        if active_devices:
            # Usar el dispositivo activo
            device_id = active_devices[0]['id']
            app.logger.debug(f"Using active device: {device_id}")
            sp.start_playback(device_id=device_id, uris=[track_uri])
        else:
            # Intentar reproducir sin especificar dispositivo (usará el por defecto)
            app.logger.debug("No active device found, trying default playback")
            sp.start_playback(uris=[track_uri])
            
        return jsonify({'status': 'success'})
        
    except Exception as e:
        app.logger.error(f"Playback error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/transfer_playback', methods=['POST'])
def transfer_playback():
    """Transferir la reproducción al dispositivo web"""
    sp, token_info = get_spotify_client()
    if not token_info:
        return jsonify({'error': 'No autenticado'}), 401
    
    try:
        data = request.json
        device_id = data.get('device_id')
        app.logger.debug(f"Transferring playback to: {device_id}")
        
        sp.transfer_playback(device_id=device_id, force_play=True)
        return jsonify({'status': 'success'})
        
    except Exception as e:
        app.logger.error(f"Transfer playback error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/devices')
def api_devices():
    sp, token_info = get_spotify_client()
    if not token_info:
        return jsonify({'error': 'No autenticado'}), 401
    
    try:
        devices = sp.devices()
        return jsonify(devices)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True, port=5000)