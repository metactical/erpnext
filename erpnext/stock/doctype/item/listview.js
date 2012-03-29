// render
wn.doclistviews['Item'] = wn.views.ListView.extend({
	init: function(d) {
		this._super(d)
		this.fields = this.fields.concat([
			"`tabItem`.item_name",
			"`tabItem`.description",
		]);
		this.stats = this.stats.concat(['default_warehouse', 'brand']);
	},

	prepare_data: function(data) {
		this._super(data);
		data.description = repl("%(item_name)s | %(description)s", data);
	},
	
	columns: [
		{width: '5%', content:'avatar'},
		{width: '20%', content:'name'},
		{width: '63%', content:'tags+description', css: {'color': '#aaa'}},
		{width: '12%', content:'modified', css: {'text-align': 'right', 'color':'#777'}}
	]
});
