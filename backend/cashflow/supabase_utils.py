from supabase import create_client, Client
from django.conf import settings
import os
import io

supabase_url = settings.SUPABASE_URL
supabase_key = settings.SUPABASE_KEY

supabase: Client = create_client(supabase_url, supabase_key)



def upload_file(file, storage_bucket, file_name):
    try:
        # Check if file is an instance of InMemoryUploadedFile
        if not hasattr(file, 'read'):
            raise TypeError("Expected file-like object, got something else.")

        print(f"Supabase Client: {supabase}")
        print(f"Storage Bucket: {storage_bucket}")
        print(f"Uploading file with name: {file_name}")

        # Read the file content
        file_content = file.read()

        # Get the bucket instance
        bucket = supabase.storage.from_(storage_bucket)

        # Check if the file already exists
        existing_file = bucket.download(file_name)
        if existing_file is not None:
            print(f"File {file_name} already exists.")
            # Optionally handle the duplicate case, like renaming the file or skipping upload
            return None

        # Upload the file to Supabase
        response = bucket.upload(file_name, file_content)
        if response['error']:
            raise Exception(response['error']['message'])
        return response['data']['public_url']
    except Exception as e:
        print(f"Error uploading file: {e}")
        return None