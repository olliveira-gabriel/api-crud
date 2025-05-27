async function connect() {  
    const { Pool } = require("pg");

    if(global.connection)
        return global.connection.connect();

    const pool = new Pool({
      user: process.env.USER_NAME,
      host: process.env.HOST_NAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      dialect: process.env.DB_DIALECT,
      port: process.env.PORT_NUMBER
    });
    
    const client = await pool.connect();
    console.log("O Pool de conexão foi criado com sucesso!")
    client.release();

    global.connection = pool;
    
    return pool.connect();
  }

  connect();

// funçao inserir clientes

async function insertCustomer(customer) {

    const client = await connect()

    const sql = "INSERT INTO client(cpf, nome, email, idade, profissao) VALUES($1, $2, $3, $4, $5);";

    // PARAMETROS INJETADOS NA CONSULTA
    const values = [customer.cpf, customer.nome, customer.email, customer.idade, customer.profissao];

    await client.query(sql, values);


}

// Função para listar clientes
async function selectCustomers() {
  // Estabelecer conexão com o banco de dados
  const client = await connect();
  // Enviar comando SQL para o banco de dados
  const res = await client.query("SELECT * FROM client");
  // Retorna as linhas (registros) da tabela
  return res.rows;
  }
  // Exportando as funções para uso no backend

  
  module.exports = {
  insertCustomer,
  selectCustomers
  }