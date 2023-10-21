import {pool} from './database.js';

class LibroController{

async getAll(req, res){
    const [result]= await pool.query ('SELECT * FROM libros');
    res.json(result)

}
async add(req, res) {
  try {
      const libros = req.body;
      if (!libros.nombre || !libros.autor || !libros.isbn) {
          throw new Error("Faltan atributos obligatorios en la solicitud");
      }
      const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, anopublicacion, isbn) VALUES (?,?,?,?,?)`,[libros.nombre, libros.autor, libros.categoria, libros.anopublicacion, libros.isbn]);
      res.json({ "Id insertado": result.insertId });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}
async getOne(req, res) {
    const id = req.params.id;
    try {
      const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
      res.json(result.length > 0 ? result[0] : { error: `Libro no encontrado ${id}` });
    } catch (error) {
      console.error('Error al obtener el libro:', error);
      res.status(500).json({ error: 'Error al obtener el libro' });
    }
  }
  async delete(req, res) {
    const libros = req.body;
    try {
      const [result] = await pool.query('DELETE FROM libros WHERE isbn = ?', [libros.isbn]);
      if (result.affectedRows > 0) {
        res.json({ "Registros eliminados": result.affectedRows });
      } else {
        res.json({ "message": "Ningún registro fue eliminado. ISBN no encontrado." });
      }
    } catch (error) {
      console.error('Error al eliminar el libro:', error);
      res.status(500).json({ error: 'Error al eliminar el libro' });
    }
  }
  
  async update(req, res) {
    const libros = req.body;
    try {
      const [result] = await pool.query(
        'UPDATE libros SET nombre = ?, autor = ?, categoria = ?, anopublicacion = ?, isbn = ? WHERE id = ?',
        [libros.nombre, libros.autor, libros.categoria, libros.anopublicacion, libros.isbn, libros.id]
      );
  
      if (result.affectedRows > 0) {
        res.json({ "Registros actualizados": result.affectedRows });
      } else {
        res.json({ "Registros actualizados": 0, error: 'ID no encontrado' });
      }
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
      res.status(500).json({ error: 'Error al actualizar el libro' });
    }
  }
  
}
export const libros = new LibroController();