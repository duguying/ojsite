{{{template "inc/header.tpl" .}}}
{{{asset "sass/register.scss"}}}
	<div class="info">&nbsp</div>
	<div class="register">
		<form action="/register" method="post" >
			<ul>
				<li>
					<label for="username">{{{i18n "username"}}}</label>
					<input type="text" name="username" id="username" class="required" data-msg-required="请输入用户名">
					<span for="" class="tips">{{{i18n "tip_username"}}}</span>
				</li>
				<li>
					<label for="password">{{{i18n "password"}}}</label>
					<input type="password" name="password" id="password" class="required password" data-msg-required="请输入密码">
					<span for="" class="tips">{{{i18n "tip_password"}}}</span>
				</li>
				<li>
					<label for="confirm">{{{i18n "password_again"}}}</label>
					<input type="password" name="confirm" id="confirm" class="required password" data-msg-required="请再次输入相同的密码" if-not-equal="两次输入密码不相同">
					<span for="" class="tips">{{{i18n "tip_password_again"}}}</span>
				</li>
				<li>
					<label for="email">{{{i18n "email"}}}</label>
					<input type="text" name="email" id="email" class="required email" data-msg-required="请输入Email" data-msg-email="请输入合法的Email">
					<span for="" class="tips">{{{i18n "tip_email"}}}</span>
				</li>
				<li>
					<label for="nickname">{{{i18n "nickname"}}}</label>
					<input type="text" name="nickname" id="nickname">
					<span for="" class="tips">{{{i18n "tip_nickname"}}}</span>
				</li>
				<li class="submit">
					<button class="btn" id="register">{{{i18n "register"}}}</button>
				</li>
			</ul>
		</form>
	</div>
{{{asset "js/user.js"}}}
{{{template "inc/footer.tpl" .}}}