# web-bookmarks
Keep your bookmarks encrypted in cloud

# about
Common browser bookmark tools (in Chrome or Firefox) force you to 1) commit to single browser platform, and 2) exposes all your personal bookmarks. This web bookmark solution encrypts data with a local password, allowing you to share bookmarks across all devices and browsers without exposing your data.

# get started

This solution requires:
- A host to server these files
- Creating a (free) firebase app to store encrypted data (<- easily rewritten for another backend storage)

Instructions:
1. Create new firebase project
2. Click "Web Setup" and copy "Initialize Firebase" script into common.js
3. Create Realtime Database (in test mode)

That's all.
refresh page, add bookmark, you'll be prompted for encryption passphrase

Optional (Firebase DB permissions)
1. Enable Firebase sign-in method Phone, and authorize your domain.
2. Use auth.html, to sign-in by phone
3. In database, set permissions for your new user.

# details

## JSON Format
Example: Use "nodes" for bookmark folders
```[
	{
		"href": "http://link1",
		"text": "link 1"
	},
	{
		"text": "Folder 1",
		"nodes": [
			{
				"text": "Folder 2",
				"nodes": [
					{
						"href": "http://link2a",
						"text": "link 2a"
					}
				]
			},
			{
				"href": "http://link1a",
				"text": "link 1a"
			}
		]
	},
	{
		"href": "http://link2",
		"text": "link 2"
	}
]```

