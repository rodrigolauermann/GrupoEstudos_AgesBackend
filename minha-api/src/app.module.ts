import { Module } from '@nestjs/common';
import {
  AppController,
  ProdutosController,
  ComprasController,
  EstoqueController,
  UsuariosController,
} from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProdutosController,
    ComprasController,
    EstoqueController,
    UsuariosController,
  ],
  providers: [AppService],
})
export class AppModule {}
