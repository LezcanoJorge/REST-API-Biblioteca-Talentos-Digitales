import {pool} from './database.js';

class LibroController{

async getAll(req, res){
    const [result]= await pool.query ('SELECT * FROM libros');
    res.json(result)

}
async add(req, res){
    const libros = req.body;
    const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, anopublicacion, isbn) VALUES (?,?,?,?,?)`, [libros.nombre, libros.autor, libros.categoria, libros.anopublicacion, libros.isbn]);
    res.json({"Id insertado": result.insertId});
}
async getOne(req, res) {
    const id = req.params.id; // Cambiar req.body.id a req.params.id
    try {
      const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
      res.json(result.length > 0 ? result[0] : { error: `Libro no encontrado ${id}` });
    } catch (error) {
      console.error('Error al obtener el libro:', error);
      res.status(500).json({ error: 'Error al obtener el libro' });
    }
  }
}
export const libros = new LibroController();