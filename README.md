# web-bookmarks
Web bookmarks manager with client-side encryption

# about
Common browser bookmark tools (in Chrome or Firefox) force you to 1) commit to single browser platform across devices, and 2) exposes all your personal bookmarks to a third party. This web bookmark solution encrypts data with a local password, allowing you to share bookmarks across all devices and browsers without exposing your data.

![screenshot](https://raw.githubusercontent.com/steve-vincent/web-bookmarks/master/screenshot.png)

# get started

You can test-drive without any special setup. Your bookmarks will be saved at `bookmarks.html?id=<my id>

### For your bookmarks to sync between devices, you'll need to a gundb server: https://github.com/amark/gun

# help
- click "..." to delete or move or rename items
- click "remember me" remember password
- click "{...}" to edit JSON manually.

## adding bookmarks
Use "Add" button, or `bookmarks.html#<url>` to add a bookmark.

TIP: use a bookmarklet to conveniently add from any browser, e.g.:
```javascript:window.location="<my host>/bookmarks.html#"+window.location;```

[Url Forwarder(android)](https://play.google.com/store/apps/details?id=net.daverix.urlforward) supports bookmarklets 

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


