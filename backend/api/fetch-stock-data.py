import os
import sys
import logging
from django.core.management import execute_from_command_line

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # This should be the 'backend' directory
print(project_root)
sys.path.append(project_root)

# sys.path.append(os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cashflow.settings')

def handler(event, context):
    try:
        logger.info("Starting fetch_stock_data command")
        sys.argv = ['manage.py', 'fetch_stock_data']
        execute_from_command_line(sys.argv)
        logger.info("fetch_stock_data command completed successfully")
        return {
            'statusCode': 200,
            'body': 'Stock data updated successfully'
        }
    except Exception as e:
        logger.error(f"Error executing fetch_stock_data command: {str(e)}")
        return {
            'statusCode': 500,
            'body': f"Error: {str(e)}"
        }

if __name__ == "__main__":
    print(handler({}, {}))

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