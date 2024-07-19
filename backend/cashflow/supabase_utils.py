from supabase import create_client, Client
from django.conf import settings

supabase_url = settings.SUPABASE_URL
supabase_key = settings.SUPABASE_KEY

supabase: Client = create_client(supabase_url, supabase_key)



def upload_file(file_path, storage_bucket, file_name):
    try:
        print(supabase)
        print(storage_bucket)
        
        response = supabase.storage().StorageFileAPI(storage_bucket).upload(file_name, file_path)
        if response['error']:
            raise Exception(response['error']['message'])
        return response['public_url']
    except Exception as e:
        print(f"Error uploading file: {e}")
        return None
