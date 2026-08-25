import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

// ============================================================
// Controller original do projeto (mantido)
// ============================================================
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// ============================================================
// Tipos simples para os dados em memória
// ============================================================
interface Produto {
  id: number;
  nome: string;
  preco: number;
}

interface Compra {
  id: number;
  produtoId: number;
  quantidade: number;
  data: string;
}

interface Estoque {
  id: number;
  produtoId: number;
  quantidade: number;
}

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

// ============================================================
// PRODUTOS -> /produtos
// ============================================================
@Controller('produtos')
export class ProdutosController {
  private produtos: Produto[] = [
    { id: 1, nome: 'Teclado Mecânico', preco: 350 },
    { id: 2, nome: 'Mouse Gamer', preco: 150 },
  ];
  private nextId = 3;

  @Get()
  findAll(): Produto[] {
    return this.produtos;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Produto | { message: string } {
    const produto = this.produtos.find((p) => p.id === Number(id));
    return produto ?? { message: 'Produto não encontrado' };
  }

  @Post()
  create(@Body() body: Omit<Produto, 'id'>): Produto {
    const novoProduto: Produto = { id: this.nextId++, ...body };
    this.produtos.push(novoProduto);
    return novoProduto;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Omit<Produto, 'id'>>,
  ): Produto | { message: string } {
    const produto = this.produtos.find((p) => p.id === Number(id));
    if (!produto) return { message: 'Produto não encontrado' };
    Object.assign(produto, body);
    return produto;
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    const index = this.produtos.findIndex((p) => p.id === Number(id));
    if (index === -1) return { message: 'Produto não encontrado' };
    this.produtos.splice(index, 1);
    return { message: 'Produto removido com sucesso' };
  }
}

// ============================================================
// COMPRAS -> /compras
// ============================================================
@Controller('compras')
export class ComprasController {
  private compras: Compra[] = [
    { id: 1, produtoId: 1, quantidade: 2, data: '2026-08-01' },
  ];
  private nextId = 2;

  @Get()
  findAll(@Query('produtoId') produtoId?: string): Compra[] {
    if (produtoId) {
      return this.compras.filter((c) => c.produtoId === Number(produtoId));
    }
    return this.compras;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Compra | { message: string } {
    const compra = this.compras.find((c) => c.id === Number(id));
    return compra ?? { message: 'Compra não encontrada' };
  }

  @Post()
  create(@Body() body: Omit<Compra, 'id'>): Compra {
    const novaCompra: Compra = { id: this.nextId++, ...body };
    this.compras.push(novaCompra);
    return novaCompra;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Omit<Compra, 'id'>>,
  ): Compra | { message: string } {
    const compra = this.compras.find((c) => c.id === Number(id));
    if (!compra) return { message: 'Compra não encontrada' };
    Object.assign(compra, body);
    return compra;
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    const index = this.compras.findIndex((c) => c.id === Number(id));
    if (index === -1) return { message: 'Compra não encontrada' };
    this.compras.splice(index, 1);
    return { message: 'Compra removida com sucesso' };
  }
}

// ============================================================
// ESTOQUE -> /estoque
// ============================================================
@Controller('estoque')
export class EstoqueController {
  private estoque: Estoque[] = [
    { id: 1, produtoId: 1, quantidade: 10 },
    { id: 2, produtoId: 2, quantidade: 25 },
  ];
  private nextId = 3;

  @Get()
  findAll(): Estoque[] {
    return this.estoque;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Estoque | { message: string } {
    const item = this.estoque.find((e) => e.id === Number(id));
    return item ?? { message: 'Item de estoque não encontrado' };
  }

  @Post()
  create(@Body() body: Omit<Estoque, 'id'>): Estoque {
    const novoItem: Estoque = { id: this.nextId++, ...body };
    this.estoque.push(novoItem);
    return novoItem;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Omit<Estoque, 'id'>>,
  ): Estoque | { message: string } {
    const item = this.estoque.find((e) => e.id === Number(id));
    if (!item) return { message: 'Item de estoque não encontrado' };
    Object.assign(item, body);
    return item;
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    const index = this.estoque.findIndex((e) => e.id === Number(id));
    if (index === -1) return { message: 'Item de estoque não encontrado' };
    this.estoque.splice(index, 1);
    return { message: 'Item de estoque removido com sucesso' };
  }
}

// ============================================================
// USUÁRIOS -> /usuarios
// ============================================================
@Controller('usuarios')
export class UsuariosController {
  private usuarios: Usuario[] = [
    { id: 1, nome: 'Ana Silva', email: 'ana@email.com' },
  ];
  private nextId = 2;

  @Get()
  findAll(): Usuario[] {
    return this.usuarios;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Usuario | { message: string } {
    const usuario = this.usuarios.find((u) => u.id === Number(id));
    return usuario ?? { message: 'Usuário não encontrado' };
  }

  @Post()
  create(@Body() body: Omit<Usuario, 'id'>): Usuario {
    const novoUsuario: Usuario = { id: this.nextId++, ...body };
    this.usuarios.push(novoUsuario);
    return novoUsuario;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Omit<Usuario, 'id'>>,
  ): Usuario | { message: string } {
    const usuario = this.usuarios.find((u) => u.id === Number(id));
    if (!usuario) return { message: 'Usuário não encontrado' };
    Object.assign(usuario, body);
    return usuario;
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    const index = this.usuarios.findIndex((u) => u.id === Number(id));
    if (index === -1) return { message: 'Usuário não encontrado' };
    this.usuarios.splice(index, 1);
    return { message: 'Usuário removido com sucesso' };
  }
}