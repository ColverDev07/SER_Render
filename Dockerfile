# Etapa 1: Construcción con Gradle
FROM gradle:jdk21-jammy as builder
WORKDIR /build-app
COPY build.gradle settings.gradle ./
COPY src ./src
# Compila la aplicación y genera el JAR. Si falla aquí, el build se detendrá.
RUN gradle build --no-daemon

# Etapa 2: Imagen final ligera
FROM openjdk:21-jdk-slim
WORKDIR /app
# Copia solo el JAR compilado desde la etapa de construcción
# Asegúrate de que 'demo-0.0.1-SNAPSHOT.jar' es el nombre correcto
COPY --from=builder /build-app/build/libs/demo-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]