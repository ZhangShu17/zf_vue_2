<template>
  <div id="wrapper">

    <div class="content">
      <div id="map" class="mapId-1" style="width: 100%; height: 100%;">
        <!--<div>
            <input id='markonmap' type='text' style='color:black;background: white;width: 160px;height: 20px;' value='116.39,39.9'>
        <button id='markeronmap' >定位到该点</button>
        </div>-->


      </div>
      <div id="drawPoint" class="menu_second" v-if=" mapType === '3' || mapType === '5'"  ><button  class="btn-info" @click="drawPoint">编辑</button><a class="second_arrow"></a></div>
      <div id="drawLine" class="menu_second" v-if="mapType === '4' || mapType === '6' && locationList == ''" ><button class="btn-info" @click="drawLine" >画线</button><a class="second_arrow"></a></div>
      <div id="editLine" class="menu_second" v-if="mapType === '4' || mapType === '6'"><button class="btn-info" @click="editLine">编辑线段</button><a class="second_arrow"></a></div>
      <div id="endEdit" class="menu_second" v-if="mapType === '4' || mapType === '6'"><button class="btn-info" @click="endEditLine">结束编辑</button><a class="second_arrow"></a></div>
      <div align="center" v-if="mapType === '4' || mapType === '6'">
        <label style="color: #1E90FF; font-size: 24px; margin-right: 20%" >(右键结束画线，二次编辑后点击结束编辑按钮进行保存)</label>
      </div>

      <div class="form-group" v-if=" mapType === '3' || mapType === '5'">
        <label class="col-sm-2 control-label">点位坐标</label>
          <input type="text" class="form-control" id="point_coor" v-model="location">
          <button class="btn-info" @click="saveCoor" >保存点位</button>
      </div>
      <div class="form-group" v-if="mapType === '4' || mapType === '6'">
        <label class="col-sm-2 control-label">线路标点</label>
          <input type="text" class="form-control" id="line_coors" v-model="locationList">
        <button class="btn-info" @click="saveLine">保存线路</button>
      </div>


      <!--        <div id=''></div> -->
    </div>
  </div>

</template>

<script>


  import config from '../config/config'
  export default {
    name: 'MapOperate',
    data () {
      return {
        count:0,
        type:'',    //上一个界面带来的参数
        // point_coor: '', //station 坐标
        // lineCoors:'',   //line 坐标
        mapType: '',    //进入map的类别
        districtId: '',
        map: null,

        //data from station
        stationName: '',
        location: '',
        station_remark1: '',
        station_remark2: '',
        station_remark3: '',
        stationId: '',

        //data from section
        roadId: '',
        sectionName: '',
        sectionId: '',
        sectionStart: '',
        sectionEnd: '',
        locationList: '',
        section_remark1: '',
        section_remark2: '',
        section_remark3: '',
        section_array: [],
        servicelinedIds: '',
        origintEditObject: '',
        editObject: '',

        //init center for the map
        center: [116.39, 39.9]
      }
    },
    methods: {
      init: function () {
        console.log('init')
        //init map
        if(this.mapType == 3 || this.mapType == 5){
          this.initHuaWeiMap()
        }else{
          this.initPGIS()
        }

        let refresh =  window.localStorage.getItem('refresh', '0')
        console.log('create map,refresh:'+ refresh)
        if(refresh == '1'){
          window.localStorage.setItem('refresh','0')
          console.log('after save ,refresh:'+ window.localStorage.getItem('refresh', '0'))
          this.$router.go(0)
        }
      },
      initHuaWeiMap: function () {
        var wms_wgs84_tilegrid = new lm.TileGrid({
          //控制地图显示范围
          extent: [-180,-90,180,90],
          origin: [-400.0, 399.9999999999998],
          resolutions:  [1.4078260157100582,
            0.703913007855028,
            0.35195650392751515,
            0.17597825196375638,
            0.08798912598187819,
            0.043994562990939096,
            0.021997281495469548,
            0.010998640747734774,
            0.005499320373868577,
            0.0027496601869330985,
            0.001374830093467739,
            6.874150467326798E-4,
            3.437075233663399E-4,
            1.7185376168316996E-4,
            8.592688084158498E-5,
            4.296344042198222E-5,
            2.148172021099111E-5,
            1.0740860104305824E-5,
            5.3704300533426425E-6,
            2.685215025481591E-6],
        });

        var paramObj = {
          mapType: 'WMS_MAP',
          // url: 'http://119.3.5.139:8080/geowebcache/service/wms',
          url: 'http://14.27.137.129:8080/geowebcache/service/wms',
          defaultZoom: 14,
          proj: 'EPSG:4326',
          minZoom: 0,
          maxZoom: 19,
          center: [116.39, 39.9],
          mapId: 'map',
          language: 'zh_CN',
          rightClickCallback: function (mapId, pos) {
            //          console.log('outdoor map right click too');
          },
          controls: {
            scaleLine: eGIS.Constant.CONTROL_TYPE.SCALELINE,
            mousePosition: eGIS.Constant.CONTROL_TYPE.MOUSEPOSITION,
          },
          // layers: "BeijingB",
          layers: "BeijingDark",
          mapName: 'MapServer',
          resolutions:[1.4078260157100582,
            0.703913007855028,
            0.35195650392751515,
            0.17597825196375638,
            0.08798912598187819,
            0.043994562990939096,
            0.021997281495469548,
            0.010998640747734774,
            0.005499320373868577,
            0.0027496601869330985,
            0.001374830093467739,
            6.874150467326798E-4,
            3.437075233663399E-4,
            1.7185376168316996E-4,
            8.592688084158498E-5,
            4.296344042198222E-5,
            2.148172021099111E-5,
            1.0740860104305824E-5,
            5.3704300533426425E-6,
            2.685215025481591E-6],
          tilegrid: wms_wgs84_tilegrid
        };
        eGIS.Map.createMap(paramObj);
      },
      initPGIS: function () {
        this.map = new EzMap('map');
        this.map.centerAndZoom( new EzCoord(116.39, 39.9), 15);
      },
      clearGeometry: function () {
        eGIS.BaseLayer.clearLayers('map');
        eGIS.Geometry.clearGeometryDraw('map');
      },
      showPoint: function(){
        eGIS.Point.addLayer({
          mapId: 'map',
          layerId: 'point_layer'
        });
        let pointCor = this.location.split(',')
        eGIS.Point.setLayerData({
          mapId: 'map',
          layerId: 'point_layer',
          datas: [{
            id:0,
            coordinate:pointCor,
            fillColor:'#407AFD',
            strokeColor: '#FFFFFF',
            strokeWidth:2,
            radius:5,
          }],
        });
      },
      showLine: function() {
        console.log('locationList:')
        console.log(this.locationList)
        let xycoordinate = this.locationList
        this.editObject = new Ez.g.Polyline(xycoordinate,{
          'strokeColor': "#8625C5",
          'strokeWidth': 3
        })
        this.map.addOverlay(this.editObject)
      },
      showOriginLines: function (){
        console.log('showline')
        console.log(this.servicelinedIds)
        let url = config.ROOT_API_URL + 'server_line/edit'
        let _this = this
        $.ajax({
          url: url,
          type: 'GET',
          data: {
            userName: localStorage.getItem('userName'),
            serviceLineId: _this.servicelinedIds
          },
          success: function (response) {
            console.log(response.data)
            _this.section_array = response.data.list[0].points
            //show on the map
            for(let i = 0;i < _this.section_array.length;i++){

              console.log("prepare to draw points:")
              console.log( _this.section_array[i])
              if(_this.section_array[i] == _this.locationList){
                continue
              }
              let editObject = new Ez.g.Polyline( _this.section_array[i],{
                'strokeColor': "#000000",
                'strokeWidth': 3
              })
              _this.map.addOverlay(editObject)
            }
          },
          error: function (err) {
            console.log(err)
          }
        })
      },
      drawPoint: function () {
        //clear the map
        this.clearGeometry()
        let _this = this
        var layer = eGIS.OlUtil.getLayer({
          mapId: 'map',
          layerId: 'tempPoint_mapId-1'
        });
        if (!layer) {
          eGIS.Point.addLayer({
            mapId: 'map',
            layerId: 'tempPoint',
            defaultVisibleLevel: 3
          })
        }
        eGIS.Geometry.drawGeometry({
          mapId: 'map',
          type: eGIS.Geometry.DrawTypes.Point,
          isOpen: true,
          showCloseIcon: true,
          showGeometry: true,
          imageRadius: 5,
          imageFillColor: '#FFFFFF',
          imageStrokeColor: '#407AFD',
          imageStrokeWidth: 2,
          clickCallback: function (point) {
            console.log(point);
          },
          endCallback: function (res) {
            console.log(res)
            _this.location = res.coordinates[0]+','+res.coordinates[1]
          }
        });
        // this.refresh = true
      },
      drawLine: function () {
        let _this = this
        this.map.changeDragMode('drawPolyline',function(e){
          let str = e.coordString;
          console.log('coordinates:')
          console.log(str);
          _this.locationList = str
          _this.editObject = new Ez.g.Polyline(str,{
            'strokeColor': "#8625C5"
          });
          _this.map.addOverlay(_this.editObject);
        });

        // this.clearGeometry()
        // let _this = this
        // eGIS.Geometry.drawGeometry({
        //   mapId: 'map',
        //   type: eGIS.Geometry.DrawTypes.LineString,
        //   isOpen: true,
        //   showCloseIcon: true,
        //   showGeometry: true,
        //   strokeColor: '#FDA135',
        //   strokeWidth: 2,
        //
        //   clickCallback: function (point) {
        //     console.log(point);
        //   },
        //   endCallback: function (res) {
        //     _this.locationList = ''
        //     console.log(res.coordinates);
        //     for(let i = 0 ;i < res.coordinates.length;i++){
        //       _this.locationList += res.coordinates[i][0]+','
        //       _this.locationList += res.coordinates[i][1]+','
        //     }
        //     _this.locationList =  _this.locationList.substring(0,_this.locationList.length-1)
        //     console.log(_this.locationList)
        //   }
        // });
        // this.refresh = true
      },
      editLine: function() {
        this.map.changeDragMode('editGeometry',function (e) {
          console.log(e.coordString)
        },this.editObject,"on");
      },
      endEditLine: function() {
        let _this = this
        this.map.changeDragMode('editGeometry',function(e){
          console.log(e.coordString);
          _this.locationList = e.coordString
        },_this.editObject,"off");
      },
      saveCoor: function () {
        console.log('savePoint:'+this.location+'districtId:'+this.districtId+'sectionId:'+this.sectionId)
        eGIS.Map.removeMap('map');
        let routePath = (this.mapType == 3 ? '/addStation' : '/submitStation')
        this.$router.push({
          path: routePath,
          query: {
            type:this.type,
            mapType: this.mapType,
            districtId: this.districtId,
            name:this.stationName,
            location:this.location,
            remark1:this.station_remark1,
            remark2:this.station_remark2,
            remark3:this.station_remark3,
            sectionId:this.sectionId,
            stationId: this.stationId,
            action: 'Edit'
          }
        })
        window.localStorage.setItem('refresh','1')
      },
      saveLine: function () {
        console.log('saveLine')
        eGIS.Map.removeMap('map');
        let routePath = (this.mapType == 4 ? '/addSection' : '/editSection')
        this.$router.push({
          path: routePath,
          query: {
            type:this.type,
            mapType:this.mapType,
            districtId: this.districtId,
            sectionName:this.sectionName,
            roadId:this.roadId,
            sectionStart:this.sectionStart,
            sectionEnd:this.sectionEnd,
            locationList:this.locationList,
            remark1:this.section_remark1,
            remark2:this.section_remark2,
            remark3:this.section_remark3,
            sectionId:this.sectionId,
            servicelinedIds: this.servicelinedIds,
            action: 'Edit'
          }
        })
        window.localStorage.setItem('refresh','1')
      }
    },
    mounted: function () {
      console.log('mounted')
      this.type = this.$route.query.type
      this.mapType = this.$route.query.mapType
      this.districtId = this.$route.query.districtId
      console.log('mounted,mapType：' + this.mapType)
      this.init()
      if(this.mapType == 3 || this.mapType == 5){
        this.sectionId = this.$route.query.sectionId
        this.stationName = this.$route.query.name
        this.location = this.$route.query.location
        this.station_remark1 = this.$route.query.remark1
        this.station_remark2 = this.$route.query.remark2
        this.station_remark3 = this.$route.query.remark3
        this.stationId = this.$route.query.stationId

        if(this.location != null && this.location != ''){
          this.showPoint()
        }
      }else if(this.mapType == 4 || this.mapType == 6){
        this.sectionId = this.$route.query.sectionId
        this.roadId = this.$route.query.roadId
        this.sectionName = this.$route.query.sectionName
        this.sectionStart = this.$route.query.sectionStart
        this.sectionEnd = this.$route.query.sectionEnd
        this.locationList = this.$route.query.locationList
        this.section_remark1 = this.$route.query.remark1
        this.section_remark2 = this.$route.query.remark2
        this.section_remark3 = this.$route.query.remark3
        this.servicelinedIds = this.$route.query.servicelinedIds
        console.log('get servicelineIds:')
        console.log(this.servicelinedIds)
        if(this.servicelinedIds != null && this.servicelinedIds != ''){
          this.showOriginLines();
        }
        if(this.locationList != null && this.locationList != ''){
          this.showLine()
        }

      }

    },
  }
  $(document).ready(function () {
    console.log('document ready')

  });
  $(document).on("pageshow",function(){
    console.log('每次切换页面时我都会出现！');
  });

</script>

<style scoped>

</style>
