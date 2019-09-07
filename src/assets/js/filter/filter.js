import Vue from 'vue'
import {formatDate} from '@/assets/js/date.js';

Vue.filter('rmb', function (value) {
 	return "￥" + value.toFixed(2)
})

Vue.filter('formatDate', function (value) {
	var date = new Date(value);
    return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
})


