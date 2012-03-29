// render
wn.doclistviews['Payable Voucher'] = wn.views.ListView.extend({
	init: function(d) {
		this._super(d);
		this.fields = this.fields.concat([
			'`tabPayable Voucher`.supplier_name',
			'`tabPayable Voucher`.currency',
			'IFNULL(`tabPayable Voucher`.grand_total_import, 0) as grand_total_import',
			'IFNULL(`tabPayable Voucher`.grand_total, 0) as grand_total',
			'IFNULL(`tabPayable Voucher`.outstanding_amount, 0) as outstanding_amount',
		]);
		this.stats = this.stats.concat(['company']);
	},

	prepare_data: function(data) {
		this._super(data);
		data.paid = flt(
			((data.grand_total - data.outstanding_amount) / data.grand_total) * 100,
			2);
	},

	columns: [
		{width: '5%', content: 'avatar'},
		{width: '3%', content: 'docstatus'},
		{width: '15%', content: 'name'},
		{width: '37%', content: 'tags+supplier_name', css: {color: '#aaa'}},
		{
			width: '18%', 
			content: function(parent, data) { 
				$(parent).html(data.currency + ' ' + fmt_money(data.grand_total_import)) 
			},
			css: {'text-align':'right'}
		},
		{width: '10%', content: 'paid', type:'bar-graph', label:'Paid'},
		{width: '12%', content:'modified', css: {
			'text-align': 'right', 'color':'#777'
		}},
	]
});
