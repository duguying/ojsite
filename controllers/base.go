package controllers

import (
	"github.com/astaxie/beego"
	"github.com/beego/i18n"
	"github.com/gogather/com"
	"github.com/gogather/com/log"
	"github.com/gojudge/ojsite/models"
	"strings"
	"time"
)

// Controller基类继承封装
type BaseController struct {
	beego.Controller
}

var LANG string

func (this *BaseController) Lang(key string) string {
	lang := this.Ctx.GetCookie("lang")
	if len(lang) == 0 {
		this.Ctx.SetCookie("lang", "zh-CN", 1<<31-1, "/")
		lang = "zh-CN"
	}

	LANG = lang

	return i18n.Tr(lang, key)
}

func (this *BaseController) Forbbiden(mark string, condition string) {
	mark = strings.ToLower(mark)
	condition = strings.ToLower(condition)

	if mark == "not" {
		if this.Data["userIs"] != condition {
			this.Redirect("/", 302)
		}
	} else {
		if this.Data["userIs"] == condition {
			this.Redirect("/", 302)
		}
	}

}

// run before get
func (this *BaseController) Prepare() {
	// get user level
	var lev string

	stn := time.Now()
	st := stn.UnixNano()
	this.Data["start"] = st

	log.Blueln(this.Ctx.Request.UserAgent())

	user := this.GetSession("username")
	if user == nil {
		lev = "guest" // guest, not login
	} else {
		level := this.GetSession("level")

		if level == nil {
			lev = "user"
		} else {
			if tmplev, ok := level.(string); !ok {
				lev = "user"
			} else {
				lev = tmplev
			}
		}

		username := user.(string)
		usr := models.User{}
		u, err := usr.GetUser(0, username, "", "")
		if err != nil {
			this.Data["nickname"] = ""
			this.Data["email_md5"] = ""
		} else {
			this.Data["username"] = username
			this.Data["nickname"] = u.Nickname
			this.Data["email_md5"] = com.Md5(u.Email)
		}

	}

	this.Data["userIs"] = lev

	// log.Pinkln(lev)
}

// run after finished
func (this *BaseController) Finish() {

}
