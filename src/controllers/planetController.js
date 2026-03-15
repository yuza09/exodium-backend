const pool = require('../db');

exports.getMyPlanets = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM planets WHERE owner_id=$1 ORDER BY created_at ASC',
      [req.player.id]
    );
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.getPlanet = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM planets WHERE id=$1 AND owner_id=$2',
      [req.params.id, req.player.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Planète introuvable' });
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.getProduction = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM planets WHERE id=$1 AND owner_id=$2',
      [req.params.id, req.player.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Planète introuvable' });
    const planet = result.rows[0];
    const now = Date.now();
    const lastUpdate = new Date(planet.last_production_at).getTime();
    const hoursElapsed = (now - lastUpdate) / 3600000;
    const b = planet.buildings || {};
    const production = {
      mfe:   Math.floor(30  * (b.mine_mfe  || 1) * Math.pow(1.1, b.mine_mfe  || 1) * hoursElapsed),
      celec: Math.floor(20  * (b.mine_celec|| 1) * Math.pow(1.1, b.mine_celec|| 1) * hoursElapsed),
      gneb:  Math.floor(15  * (b.mine_gneb || 1) * Math.pow(1.1, b.mine_gneb || 1) * hoursElapsed),
      bio:   Math.floor(25  * (b.mine_bio  || 1) * Math.pow(1.1, b.mine_bio  || 1) * hoursElapsed),
    };
    res.json({
      planet_id: planet.id,
      hours_elapsed: hoursElapsed.toFixed(2),
      production
    });
  } catch (e) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};