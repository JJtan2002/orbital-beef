const { exec } = require('child_process');

export default async function handler(req, res) {
  exec('python manage.py fetch_stock_data', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: 'Failed to execute command' });
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.status(200).json({ message: 'Stock data updated successfully', output: stdout, error: stderr });
  });
}