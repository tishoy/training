// @flow

import React from 'react';
import { applyRouterMiddleware, browserHistory, Router, Route, IndexRoute } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { kebabCase, titleize } from 'training/src/utils/helpers';
import AppFrame from 'training/src/components/AppFrame';
// import AppContent from 'training/src/components/AppContent';
// import MarkdownDocs from 'training/src/components/MarkdownDocs';
import Home from 'training/src/pages/Home';
// import { componentAPIs, requireMarkdown, demos, requireDemo } from 'training/src/components/files';

import Enrolled from '../pages/com/enrolled/enrolled.page.js';
import Password from '../pages/com/infos/admin.paper.js';
import CompanyHome from '../pages/com/home/home.page.js';
import Students from '../pages/com/students/students.page.js';
import Exams from '../pages/com/exams/exams.page.js';
import Infos from '../pages/com/infos/info.page.js';

import OrganizationHome from '../pages/org/home';
import Area from '../pages/org/area';
import Score from '../pages/org/score';
import Clazz from '../pages/org/clazz';

import Lang from '../language';

import { APP_TYPE_UNLOGIN, APP_TYPE_COMPANY, APP_TYPE_ORANIZATION } from '../enum';

var AppRouter =

  <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
    <Route title="Training" path="/" component={AppFrame}>
      <IndexRoute dockDrawer title={null} nav component={AppFrame} />
      <Route
        title={titleize(Lang[window.Lang].pages.com.home.title)}
        path={'/com/home'}
        content={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? CompanyHome : AppFrame}
        nav={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? true : false}
        component={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? CompanyHome : AppFrame}
      />
      <Route
        title={titleize(Lang[window.Lang].pages.com.infos.title)}
        path={'/com/infos'}
        content={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? Infos : AppFrame}
        nav={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? true : false}
        component={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? Infos : AppFrame}
      />
      {/* <Route
        title={titleize(Lang[window.Lang].pages.com.students.title)}
        path={'/com/students'}
        content={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? Students : AppFrame}
        nav={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? true : false}
        component={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? Students : AppFrame}
      /> */}
      <Route
        title={titleize(Lang[window.Lang].pages.com.enrolled.title)}
        path={'/com/enrolled'}
        content={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? Enrolled : AppFrame}
        nav={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? true : false}
        component={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? Enrolled : AppFrame}
      />
      <Route
        title={titleize(Lang[window.Lang].pages.com.infos.admin.password)}
        path={'/com/password'}
        content={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? Password : AppFrame}
        nav={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? true : false}
        component={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? Password : AppFrame}
      />
      {/* <Route
        title={titleize(Lang[window.Lang].pages.com.exams.title)}
        path={'/com/exams'}
        content={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? Exams : AppFrame}
        nav={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? true : false}
        component={sessionStorage.getItem("apptype") == APP_TYPE_COMPANY ? Exams : AppFrame}
      /> */}
      <Route
        title={titleize(Lang[window.Lang].pages.org.home.title)}
        path={'/org/home'}
        content={sessionStorage.getItem("apptype") == APP_TYPE_ORANIZATION ? OrganizationHome : AppFrame}
        nav={sessionStorage.getItem("apptype") == APP_TYPE_ORANIZATION ? true : false}
        component={sessionStorage.getItem("apptype") == APP_TYPE_ORANIZATION ? OrganizationHome : AppFrame}
      />
      {/* <Route
        title={titleize(Lang[window.Lang].pages.org.enroll.title)}
        path={'/org/enroll'}
        content={sessionStorage.getItem("apptype") == APP_TYPE_ORANIZATION ? Enroll : AppFrame}
        nav={sessionStorage.getItem("apptype") == APP_TYPE_ORANIZATION ? true : false}
        component={sessionStorage.getItem("apptype") == APP_TYPE_ORANIZATION ? Enroll : AppFrame}
      /> */}
      <Route
        title={titleize(Lang[window.Lang].pages.org.clazz.title)}
        path={'/org/clazz'}
        content={sessionStorage.getItem("apptype") == APP_TYPE_ORANIZATION ? Clazz : AppFrame}
        nav={sessionStorage.getItem("apptype") == APP_TYPE_ORANIZATION ? true : false}
        component={sessionStorage.getItem("apptype") == APP_TYPE_ORANIZATION ? Clazz : AppFrame}
      />
      {/* <Route
        title={titleize(Lang[window.Lang].pages.org.score.title)}
        path={'/org/score'}
        content={sessionStorage.getItem("apptype") == APP_TYPE_ORANIZATION ? Score : AppFrame}
        nav={sessionStorage.getItem("apptype") == APP_TYPE_ORANIZATION ? true : false}
        component={sessionStorage.getItem("apptype") == APP_TYPE_ORANIZATION ? Score : AppFrame}
      /> */}
      <Route
        title={titleize(Lang[window.Lang].pages.org.area.title)}
        path={'/org/area'}
        content={sessionStorage.getItem("apptype") == APP_TYPE_ORANIZATION ? Area : AppFrame}
        nav={sessionStorage.getItem("apptype") == APP_TYPE_ORANIZATION ? true : false}
        component={sessionStorage.getItem("apptype") == APP_TYPE_ORANIZATION ? Area : AppFrame}
      />
    </Route>
  </Router>

export default AppRouter;