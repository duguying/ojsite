package controllers

import (
	log "github.com/Sirupsen/logrus"
	"github.com/gojudge/ojsite/global"
	"github.com/gojudge/ojsite/models"
	"github.com/gojudge/ojsite/service"
	"github.com/labstack/echo"
	"net/http"
)

// Index index page
func Index(c echo.Context) error {
	//return c.String(http.StatusOK, "welcome")
	if global.Config == nil {
		log.Info("没有配置文件")
		var err error
		global.Config, err = service.ConfigLoad()
		if err != nil {
			log.Error("读取配置文件错误")
		}
	}

	dburl, _ := global.Config.GetValue("database", "dburl")
	if dburl == "" {
		log.Info("准备安装")
		return InstallIndex(c)
	}

	log.Info(c.Get("res"))
	return c.Render(http.StatusOK, "index.html", c.Get("res"))
}

// InsallIndex install page
func InstallIndex(c echo.Context) error {
	return c.Render(http.StatusOK, "install.html", nil)
}

// InstallDoSubmit to init a new database
func InstallDoSubmit(c echo.Context) error {
	dburl := c.FormValue("dburl")
	dbport := c.FormValue("dbport")
	dbuser := c.FormValue("dbuser")
	dbpwd := c.FormValue("dbpwd")
	dbname := c.FormValue("dbname")
	adminuser := c.FormValue("adminuser")
	adminpwd := c.FormValue("adminpwd")
	err := service.DBInit(dburl, dbport, dbuser, dbpwd, dbname)

	// register admin user
	log.WithFields(log.Fields{
		"username": adminuser,
	}).Info("添加管理员用户")

	models.SetEngine(service.Engine)

	var user models.User
	user.Register(adminuser, adminpwd, "yzhl314@126.com", "Laily")

	res := make(map[string]interface{})
	res["success"] = true
	if err != nil {
		res["success"] = false
		res["msg"] = err
		return c.JSON(http.StatusOK, res)
	}
	return c.JSON(http.StatusOK, res)
}
