'use strict';

var bus = new Vue();

Vue.component('com-header', {
  template: '#com-header',
  data: function data() {
    return {
      area: '',
      areas: ['全部區域', '萬華區', '中正區', '大同區', '中山區', '大安區', '南港區', '文山區', '信義區', '士林區', '北投區', '內湖區'],
      toPageOne: 1
    };
  },

  watch: {
    area: 'changeArea'
  },
  methods: {
    changeArea: function changeArea() {
      bus.$emit('changeArea', this.area);
      bus.$emit('resetPage', this.toPageOne);
    }
  }
});

Vue.component('com-content', {
  template: '#com-content',
  data: function data() {
    return {
      disasterData: [],
      currArea: '',
      currPage: 1,
      countOfPage: 50
    };
  },
  created: function created() {

    this.getData();
    bus.$on('changeArea', this.changeList);
    bus.$on('resetPage', this.resetPage);
  },

  computed: {
    filteredArea: function filteredArea() {
      var currArea = this.currArea;
      return this.currArea.trim() !== '全部區域' ? this.disasterData.filter(function (d) {
        return d.CaseLocationDistrict.indexOf(currArea) > -1;
      }) : this.disasterData;
    },
    totalPage: function totalPage() {
      return Math.ceil(this.filteredArea.length / this.countOfPage);
    },
    pageStart: function pageStart() {
      return (this.currPage - 1) * this.countOfPage;
    }
  },

  methods: {
    getData: function getData() {
      var xhr = new XMLHttpRequest();
      xhr.open('get', 'https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json');
      xhr.send(null);
      var self = this;
      xhr.onload = function () {
        var info = JSON.parse(xhr.responseText);
        self.disasterData = info.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
        console.log(self.disasterData);
      };
    },
    changeList: function changeList(area) {
      this.currArea = area;
    },
    setPage: function setPage(idx) {
      this.currPage = idx;
    },
    resetPage: function resetPage() {
      this.currPage = 1;
    }
  }

});

var app = new Vue({
  el: '#app',
  data: {
    msg: 'hello'
  }
});