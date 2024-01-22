import { UserModule } from '../user.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as C from './test.constants';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/(POST)- should return 400 if only name is provided', async () => {
    const payload = {
      name: 'Zenon Test'
    };
    const response = await request(app.getHttpServer())
      .post('/user')
      .send(payload)
      .expect(400);

    C.REGISTER_WITHOUT_NAME_ERROR_MESSAGES.forEach((message) => {
      expect(response.body.message).toContainEqual(message);
    });
  });
});
