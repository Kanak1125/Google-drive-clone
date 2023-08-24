## Dependencies to install

- npm i bootstrap react-bootstrap 
- npm install react-router-dom
- npm install firebase
- npm install react-icons
- npm i uuid

## Important firebase rules modifications

- Replace the functions inside of the match /{document=**} {
    /* These functions.... */
}

like this:
(so that only the authenticated and the owner can modify folder and file structures in the drive)

match /{document=**} {
    function authed() {
    	return request.auth != null;
    }

    function matchesUser(data) {
    	return request.auth.uid == data.userId;
    }

    function notUpdating(field) {
    	return !(field in request.resource.data) || resource.data[field] == request.resource.data[field]
    }

    allow read: if authed() && matchesUser(resource.data)
    allow create: if authed() && matchesUser(request.resource.data)
    allow update: if authed() && matchesUser(resource.data) && notUpdating("userId")
    allow delete: if authed() && matchesUser(resource.data)
}