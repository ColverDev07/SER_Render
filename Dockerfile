# Etapa 1: Construcción con Gradle
FROM gradle:jdk21-jammy as builder
WORKDIR /build-app
COPY build.gradle settings.gradle ./
COPY src ./src
# Compila la aplicación y genera el JAR.
RUN gradle build --no-daemon

# Etapa 2: Imagen final ligera
FROM openjdk:21-jdk-slim
WORKDIR /app
# 👇 CAMBIO: Usa un comodín (*) para copiar cualquier .jar encontrado 👇
COPY --from=builder /build-app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]