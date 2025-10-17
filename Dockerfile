# Etapa 1: Construcción con Gradle usando el Wrapper
FROM gradle:jdk21-jammy as builder
WORKDIR /build-app
COPY gradlew gradlew.bat ./
COPY gradle ./gradle
COPY build.gradle settings.gradle ./
COPY src ./src
RUN chmod +x ./gradlew
RUN ./gradlew build --no-daemon

# Etapa 2: Imagen final ligera
FROM openjdk:21-jdk-slim
WORKDIR /app

# 👇 AÑADE ESTA LÍNEA PARA COPIAR LA CLAVE 👇
# Copia la clave JSON desde la carpeta local al contenedor
COPY gen-lang-client-0611492048-67a591db1f83.json keyfile.json

# Copia solo el JAR compilado desde la etapa de construcción
COPY --from=builder /build-app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]