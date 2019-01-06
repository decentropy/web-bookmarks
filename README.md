# web-bookmarks
Keep your bookmarks encrypted in cloud

# about
Common browser bookmark tools (in Chrome or Firefox) force you to 1) commit to single browser platform across devices, and 2) exposes all your personal bookmarks to a third party. This web bookmark solution encrypts data with a local password, allowing you to share bookmarks across all devices and browsers without exposing your data.

![screenshot](https://raw.githubusercontent.com/steve-vincent/web-bookmarks/master/screenshot.png)

# get started

This solution requires:
- A host to server these files
- Creating a (free) firebase app to store encrypted data (*<- could be rewritten for another backend*)

Instructions:
1. Create new (free) firebase project
2. Click "Web Setup" and copy "Initialize Firebase" script into common.js
3. Create Realtime Database (in test mode)

That's all.
refresh bookmarks.html, add bookmark, you'll be prompted for encryption passphrase

Optional (Firebase DB permissions) - *auth by phone, if you're worried some javascript prankster will find and delete your data*
1. Enable Firebase sign-in method Phone, and authorize your domain.
2. Use auth.html, to sign-in by phone
3. In database, set permissions for your new user.

# details

## help
- click "edit" to manually edit JSON. You must click "save" to commit remote storage.
- use "manage" link, if JSON GUI is easier for you.
- click the "..." to delete a bookmark

## adding bookmarks
To bookmark a page, use link or you open "bookmarks.html#<url to add>"

To add from browser in your PC, use a bookmarklet, e.g.:

```javascript:window.location="<my host>/bookmarks.html#"+window.location;```

On an android phone, [Url Forwarder](https://play.google.com/store/apps/details?id=net.daverix.urlforward) app works to share current page. (sorry, I don't know about ios)



## folders
Example JSON: Use "nodes" for folders
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


