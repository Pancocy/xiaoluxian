# 项目文档目录以及接口说明

### 1.文件说明

```
│ README.md              //项目说明文件
│  
│  
├─app                                  //前端项目 app
│  │  .browserslistrc
│  │  .gitignore
│  │  package-lock.json
│  │  package.json
│  │  README.md
│  │  vite.config.js
│  │  index.html
│  ├─public
│  │      favicon.ico
│  └─src
│      │  App.vue
│      │  main.js
│      │  style.css
│      │  
│      ├─assets
│      │  │ 图片静态资源
│      │ 
│      │          
│      ├─components
│      │     │verifition(封装的滑块支付组件)
│      │	 │各类组件
│	   │
│      │─mixin
│      │      │课程等级判断的混入
│	   │
│	   │─router
│	   │		index.js
│	   │
│	   │─store
│      │ 		index.js
│	   │		pinia状态管理
│	   │─utils
│				api


```





### 2.后端接口

```
BaseUrl='http://localhost:5173/'
Proxy：http://testapi.xuexiluxian.cn
```



| 请求方法 |              请求地址               |                             参数                             |             备注             |
| :------: | :---------------------------------: | :----------------------------------------------------------: | :--------------------------: |
|   post   |          `/course/mostNew`          |              `{pagenum:number,pageSize:number}`              |      获取新上好课的数据      |
|   get    |        `/slider/getSliders`         |                              无                              |       获取一级筛选菜单       |
|   get    |         `/course/getDetail`         |                      `courseId：课程ID`                      |   获取对应ID课程的详细信息   |
|   get    |    `/course/downloadAttachment`     |                  `{courseId:,attachmentId}`                  | 获取匹配课程相对应的下载信息 |
|   post   |          `/u/loginByJson`           |       `          username:Encrypt(userInfo.userName),`       |       匹配用户的用户名       |
|   get    |           `u/loginByJson`           | `username:Encrypt(userInfo.userName),password:Encrypt(userInfo.pwd),` | 请求验证用户账号密码是否正确 |
|   get    | ``/sms/sendRegisterOrLoginCaptcha`` |              `mobile:userInfoPhone.phoneNumber`              |   验证用户手机号码是否正确   |
|   get    |        `/slider/getSliders`         |                              无                              |      获取首页轮播图图片      |



### 3.技术栈

+ Vue3

+ element-ui

+ Pinia

  
