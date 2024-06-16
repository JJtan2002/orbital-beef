### For Testing Locally
1. **modify settings.py**: change to testing version DATABASE, change to local version CORS_ALLOWED_ORIGINS.
2. **modify .env in frontend**: use the local version BACKEND_URL 

### To Create Private Views and Access From Frontend
1. **decorator before declaring the view class or view function**: 
```
# Option 1
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

@permission_classes([IsAuthenticated])
class ExampleView(APIView):
... ...
```
```
# Option 2
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

class ExampleView(APIView)
    permission_classes = [IsAuthenticated]
    ... ...
```

2. **use customized hook to access private views**:
```
/**
* 1. apiProtected is just an example name, can use whatever you like
* 2. like axios.get/post/put/delete, we can use apiProtected.get/post/put/delete.
* But for the URL, only need to include the part after the baseURL cuz it is configurated in the useAxiosPrivate already.
* So in the example below we are actually approaching "http://localhost:8000/protected".
**/


import useAxiosPrivate from "../hooks/useAxiosPrivate";

const apiProtected = useAxiosPrivate();

const getProtectedData = async () => {
    try {
        const response = await apiProtected.get('/protected/');
        console.log('Protected data:', response.data);
        // Handle response data as needed
    } catch (error) {
        console.error('Error fetching protected data:', error);
        // Handle error
    }
};