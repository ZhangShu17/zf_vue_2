<template>
  <div id="wrapper">

    <div class="content">
      <div id="map" class="mapId-1" style="width: 608px; height: 100%;">
        <!--<div>
            <input id='markonmap' type='text' style='color:black;background: white;width: 160px;height: 20px;' value='116.39,39.9'>
        <button id='markeronmap' >定位到该点</button>
        </div>-->




      </div>
      <div id="drawPoint" class="menu_second"><button @click="drawPoint">画点</button><a class="second_arrow"></a></div>
      <div id="drawLine" class="menu_second"><button @click="drawLine">画线</button><a class="second_arrow"></a></div>
      <div class="form-group">
        <label class="col-sm-4 control-label">点位坐标</label>
        <div class="col-sm-4">
          <input type="text" class="form-control" id="point_coor" v-model="point_coor">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-4 control-label">线路标点</label>
        <div class="col-sm-4">
          <input type="text" class="form-control" id="line_coors" v-model="lineCoors">
        </div>
      </div>
      <button @click="saveCoor" >保存点位</button>
      <button @click="saveLine">保存线路</button>

      <div id='mask' class = 'mask'>
        <div id = 'closeMask' class='closeMask'>
          <p id = 'minimum' class="minimum">−</p>
          <p id = 'close' class='close'>X</p>
        </div>

      </div>
      <!--        <div id=''></div> -->
    </div>
  </div>

</template>

<script>



  export default {
    name: 'MapOperate',
    data () {
      return {
        type:'',    //上一个界面带来的参数
        point_coor: '', //station 坐标
        lineCoors:'',   //line 坐标
        mapType: '',    //进入map的类别
        districtId: '',

        //data from station
        stationName: '',
        location: '',
        station_remark1: '',
        station_remark2: '',
        station_remark3: '',
        sectionId: '',

        //data from section
        roadId: '',
        sectionName: '',
        sectionStart: '',
        sectionEnd: '',
        locationList: '',
        section_remark1: '',
        section_remark2: '',
        section_remark3: ''
      }
    },
    methods: {
      init: function () {
        console.log('init')
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
          url: 'http://119.3.5.139:8080/geowebcache/service/wms',
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
          layers: "BeijingB",
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
        console.log('create map')
        eGIS.Map.createMap(paramObj);

      },
      drawPoint: function () {
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
            _this.point_coor = res.coordinates[0]+','+res.coordinates[1]
          }
        });
      },
      drawLine: function () {
        let _this = this
        eGIS.Geometry.drawGeometry({
          mapId: 'map',
          type: eGIS.Geometry.DrawTypes.LineString,
          isOpen: true,
          showCloseIcon: true,
          showGeometry: true,
          strokeColor: '#FDA135',
          strokeWidth: 2,

          clickCallback: function (point) {
            console.log(point);
          },
          endCallback: function (res) {
            _this.lineCoors = ''
            console.log(res.coordinates);
            for(let i = 0 ;i < res.coordinates.length;i++){
              _this.lineCoors += res.coordinates[i][0]+','
              _this.lineCoors += res.coordinates[i][1]+','
            }
            if(_this.lineCoors.endsWith(',')){
              _this.lineCoors =  _this.lineCoors.substring(0,_this.lineCoors.length-1)
            }
            console.log(_this.lineCoors)
          }
        });
      },
      saveCoor: function () {
        console.log('savePoint:'+this.point_coor)
        this.$router.push({
          path: '/addStation',
          query: {
            type:this.type,
            mapType:3,
            districtId: this.districtId,
            name:this.stationName,
            location:this.point_coor,
            remark1:this.station_remark1,
            remark2:this.station_remark2,
            remark3:this.station_remark3,
            sectionId:this.sectionId
          }
        })
      },
      saveLine: function () {
        console.log('saveLine')
        this.$router.push({
          path: '/addSection',
          query: {
            type:this.type,
            mapType:4,
            districtId: this.districtId,
            sectionName:this.sectionName,
            roadId:this.roadId,
            sectionStart:this.sectionStart,
            sectionEnd:this.sectionEnd,
            locationList:this.lineCoors,
            remark1:this.section_remark1,
            remark2:this.section_remark2,
            remark3:this.section_remark3,
            sectionId:this.sectionId
          }
        })
      }
    },
    mounted: function () {
      this.init()
      this.type = this.$route.query.type
      this.mapType = this.$route.query.mapType
      this.districtId = this.$route.query.districtId
      console.log('mounted,mapType：' + this.mapType+'districtId:'+this.districtId)
      if(this.mapType == 3){
        this.stationName = this.$route.query.name
        this.location = this.$route.query.location
        this.station_remark1 = this.$route.query.remark1
        this.station_remark2 = this.$route.query.remark2
        this.station_remark3 = this.$route.query.remark3
        console.log('stationIntoMap'
          +'stationName:'+this.stationName
          + 'location:'+this.location)
      }else if(this.mapType == 4){
        this.roadId = this.$route.query.roadId,
        this.sectionName = this.$route.query.sectionName,
        this.sectionStart = this.$route.query.sectionStart,
        this.sectionEnd = this.$route.query.sectionEnd,
        this.locationList = this.$route.query.loactionList,
        this.section_remark1 = this.$route.query.remark1,
        this.section_remark2 = this.$route.query.remark2,
        this.section_remark3 = this.$route.query.remark3
        console.log('sectionIntoMap'
          +'name:'+this.sectionName
          + 'location:'+this.location+'sectionName:'+this.sectionName+',sectionStart:'+this.sectionStart,'sectionRemark1:'+this.section_remark1)
      }

    }
  }
</script>

<style scoped>

</style>
