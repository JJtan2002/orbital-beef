from supabase import create_client, Client
from django.conf import settings
import os
import io
import time
import httpx

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

        # Generate a new file name if the file already exists
        original_file_name, file_extension = os.path.splitext(file_name)
        new_file_name = file_name
        while True:
            try:
                # Check if the file already exists
                bucket.download(new_file_name)
                # If it exists, rename the file by appending a timestamp
                timestamp = int(time.time())
                new_file_name = f"{original_file_name}_{timestamp}{file_extension}"
            except Exception:
                # If file does not exist, break the loop
                break

        print(f"Final file name to upload: {new_file_name}")

        # Upload the file to Supabase
        response = bucket.upload(new_file_name, file_content)
        print(response)
        if isinstance(response, httpx.Response):
            response_json = response.json()
            if 'error' in response_json:
                raise Exception(response_json['error'].get('message', 'Unknown error occurred'))
            return response_json.get('data', {}).get('public_url', None)
        else:
            print(f"Unexpected response type: {type(response)}")
            return None
    except Exception as e:
        print(f"Error uploading file: {e}")
        return None