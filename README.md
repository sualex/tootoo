## Description

Tech interview sample project implementation. See [task definition](https://github.com/sualex/tootoo/issues/2)

## Installation

If needed ...

```bash
$ yarn
```

## Running the app

```bash
$ yarn start
```

Installs packages, runs Postgres in docker container, generates certificates in  ./auth dir, starts the service.
Then: 

```bash
$  grpcurl -cacert ./auth/server_cert.pem -cert ./auth/Alice_cert.pem -key ./auth/Alice_key.pem -format json -proto ./src/picture/picture.proto -d '{"id": 1}' localhost:5000 picture.PictureService/Find
```

-d '{"id": 1}' can be any query object matching PictureQuery interface

## Test

Not working for now - some troubles with TypeORM driver init on beforeAll. No time to track )

## Stay in touch

- Author - [Alex Gu](https://github.com/sualex)
- Telegram - [@sualexx](https://telegram.me/sualexx)

## License

  [MIT licensed](LICENSE)
