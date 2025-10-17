# Usa una imagen base oficial de Java (OpenJDK) con una versión compatible
# Asegúrate de que la versión de Java aquí (21) coincida con la de tu build.gradle
FROM openjdk:21-jdk-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo JAR compilado desde la carpeta build de Gradle al contenedor
# Gradle por defecto genera el JAR en build/libs/nombre_del_jar.jar
# Reemplaza 'demo-0.0.1-SNAPSHOT.jar' si tu archivo JAR tiene otro nombre
COPY build/libs/demo-0.0.1-SNAPSHOT.jar app.jar

# Expone el puerto que usa Spring Boot (por defecto 8080)
EXPOSE 8080

# Comando para ejecutar la aplicación cuando el contenedor inicie
ENTRYPOINT ["java", "-jar", "app.jar"]