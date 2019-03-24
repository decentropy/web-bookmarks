# web-bookmarks
Web bookmarks manager with client-side encryption

# about
Common browser bookmark tools (in Chrome or Firefox) force you to 1) commit to single browser platform across devices, and 2) exposes all your personal bookmarks to a third party.

This web bookmark solution encrypts data with a local password, allowing you to share bookmarks across all devices and browsers without exposing your data.

![screenshot](https://raw.githubusercontent.com/steve-vincent/web-bookmarks/master/screenshot.png)

# get started

This solution requires creating a (free) firebase app to store encrypted data (*<- Write your own backend easily... it's a simple get/put on a single encrypted data field*)

Instructions:
1. Create new (free) firebase project
2. Click "Web Setup" and copy "Initialize Firebase" script into common.js
3. Create Realtime Database (in test mode)

That's all.
refresh bookmarks.html, add bookmark, you'll be prompted for encryption passphrase

# details

## help
- click "..." to delete or move an item
- click "edit" to manually edit JSON. You must click "save" to commit remote storage.
- use "manage" link, for convenient GUI JSON editor

## adding bookmarks
To bookmark a page, use link or you open `bookmarks.html#<url_to_add.com>`

To add from browser in your PC, use a bookmarklet, e.g.:

```javascript:window.location="<my host>/bookmarks.html#"+window.location;```

On an android phone, share current page as bookmark with [Url Forwarder](https://play.google.com/store/apps/details?id=net.daverix.urlforward) (sorry, I don't know about ios)

## config
Override config with URL parameters: `bookmarks.html?storageid=<storageid>&remember=<true/false>`

Use for separate bookmark "pages":
- storageid: key name for storage
- remember: use local storage? (false=prompt password each time)

## folders and format
Example JSON: Use "nodes" for folders. 
See [bootstrap-treeview](https://github.com/jonmiles/bootstrap-treeview) for more menu formatting options.
```
[
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
]
```


