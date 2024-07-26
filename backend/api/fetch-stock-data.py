import os
import sys
from django.core.management import execute_from_command_line

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cashflow.settings')


def handler(event, context):
    sys.argv = ['manage.py', 'fetch_stock_data']
    execute_from_command_line(sys.argv)
    return{
        'statusCode': 200,
        'body': 'Stock data updated successfully'
    }

# export default async function handler(req, res) {
#   exec('python manage.py fetch_stock_data', (error, stdout, stderr) => {
#     if (error) {
#       console.error(`exec error: ${error}`);
#       return res.status(500).json({ error: 'Failed to execute command' });
#     }
#     console.log(`stdout: ${stdout}`);
#     console.error(`stderr: ${stderr}`);
#     res.status(200).json({ message: 'Stock data updated successfully', output: stdout, error: stderr });
#   });
# }