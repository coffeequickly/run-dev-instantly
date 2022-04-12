ARG NODE_VERSION
#ENV WORKDIR dir
#ENV EXPOSE_PORT port
#ENV START_COMMAND cmd
#ENV GITHUB_TOKEN token

FROM node:${NODE_VERSION}
RUN apt-get update && apt-get install git -y
RUN mkdir -p /app
WORKDIR /app

ARG GITHUB_TOKEN
ARG GITHUB_TARGET

RUN git clone https://${GITHUB_TOKEN}@github.com/${GITHUB_TARGET}.git

WORKDIR /app/half.engineer

RUN npm install -y

RUN echo "[npm install]"

# TODO 실행 IP를 0.0.0.0 으로 바꿔주자. localhost 로 하면 잘 안 붙는...?

EXPOSE 3000

RUN echo "[npm run dev]"

CMD [ "npm", "run", "dev" ]