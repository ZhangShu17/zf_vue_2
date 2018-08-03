import Vue from 'vue'
import Router from 'vue-router'
import AddAdmin from '@/components/AddAdmin'
import ScoreList from '@/components/ScoreList'
import SubmitScore from '@/components/SubmitScore'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import commonUser from '@/components/commonUser'
import ImageFile from '@/components/ImageFile'
import AddCommodity from '@/components/AddCommodity'
import CommodityLunBo from '@/components/commodity_lunbo'
import CommodityList from '@/components/commoditylist'
import EditCommodity from '@/components/editCommodity'
import RoadSectionStationFaculty from '@/components/RoadSectionStationFaculty'
import editFaculty from '@/components/editFaculty'
import addFaculty from '@/components/addFaculty'
import FacultyList from '@/components/FacultyList'
import StationList from '@/components/StationList'
import editSection from '@/components/editSection'
import addSection from '@/components/addSection'
import SubmitStation from '@/components/SubmitStation'
import AddStation from '@/components/AddStation'
import roadExcel from '@/components/roadExcel'
import ServiceLine from '@/components/ServiceLine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/serviceLineList',
      name: 'servieLineList',
      component: ServiceLine
    },
    {
      path: '/roadExcel',
      name: 'roadExcel',
      component: roadExcel
    },
    {
      path: '/addStation',
      name: 'addStation',
      component: AddStation
    },
    {
      path: '/submitStation',
      name: 'SubmitStation',
      component: SubmitStation
    },
    {
      path: '/editSection',
      name: 'editSection',
      component: editSection
    },
    {
      path: '/addSection',
      name: 'addSection',
      component: addSection
    },
    {
      path: '/stationList',
      name: 'StationList',
      component: StationList
    },
    {
      path: '/FacultyList',
      name: 'FacultyList',
      component: FacultyList
    },
    {
      path: '/addFaculty',
      name: addFaculty,
      component: addFaculty
    },
    {
      path: '/editFaculty',
      name: editFaculty,
      component: editFaculty
    },
    {
      path: '/facultyInfo',
      name: RoadSectionStationFaculty,
      component: RoadSectionStationFaculty
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/editCommodity',
      name: 'editCommodity',
      component: EditCommodity
    },
    {
      path: '/sectionlist',
      name: 'sectionList',
      component: CommodityList

    },
    {
      path: '/conmoditylunbo',
      name: 'conmoditylunbo',
      component: CommodityLunBo
    },
    {
      path: '/addcommodity',
      name: 'AddCommodity',
      component: AddCommodity
    },
    {
      path: '/imagefile',
      name: 'ImageFile',
      component: ImageFile
    },
    {
      path: '/addroad',
      name: 'AddRoad',
      component: AddAdmin
    },
    {
      path: '/submitRoad',
      name: 'SubmitRcore',
      component: SubmitScore
    },
    {
      path: '/roadlist',
      name: 'RoadList',
      component: ScoreList
    },
    {
      path: '/commonUser',
      name: 'commonUser',
      component: commonUser
    }
  ]
})
