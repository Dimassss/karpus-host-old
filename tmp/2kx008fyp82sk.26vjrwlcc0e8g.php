<!DOCTYPE HTML>
<html>
	<head>
		<title>Ферма Карпусь</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="/app/assets/css/picnic.css" />
		<link rel="stylesheet" href="/app/assets/css/main.css" />
		<link rel="icon" href="favicon.ico" type="image/x-icon" />

		<script src="https://www.google.com/recaptcha/api.js" async defer></script>
	</head>
	<body class="is-preload">
		<!--
		<?= ($r)."
" ?>
		-->
		<!-- Header -->
		<nav id="header">
			<a href="#wrapper"><span class="image avatar"><img src="<?= ($i00) ?>" alt="" /></span></a>
			<header>
				<h1 id="logo"><a href="#wrapper">Ферма Карпусь</a></h1>
			</header>
			<div id="nav">
				<ul>
					<li><a href="#welcome" class="active"><?= ($nav01) ?></a></li>
					<li><a href="#our_family"><?= ($nav02) ?></a></li>
					<li><a href="#what_we_grow"><?= ($nav03) ?></a></li>
					<!--li><a href="#how_to_buy">Як замовити і купити</a></li>-->
					<li><a href="#lets_introduce"><?= ($nav04) ?></a></li>
				</ul>
			</div>
			<footer>
				<footer>
					<ul class="icons">
						<li><a href="https://www.facebook.com/karpus.farm/" class="icon fa-facebook"><span class="label">Facebook</span></a></li>
						<li><a href="https://www.instagram.com/karpusfarm/?hl=ru" class="icon fa-instagram"><span class="label">Instagram</span></a></li>
						<!--<li><a href="/blog" class="icon fa-book"><span class="label">Blog</span></a></li>-->
					</ul>
				</footer>
			</footer>
		</nav>

		<!-- Wrapper -->
		<div id="wrapper">


			<div id="main">

				<section>
					<div class="main">
						<div class="image-main"></div>
					</div>
				</section>

				<section id="welcome">
					<div class="container">


						<h1 class="blue"><?= ($h01) ?></h1><br>
						<div>
							<video width="100%" controls="" style="border-radius:5px">
							  <source src="<?= ($v00) ?>" type="video/mp4">
								Your browser does not support the video tag.
							</video>
						</div><br>
						<p>
							<?= ($t01)."
" ?>
						</p>
					</div><br>
				</section>

				<section id="our_family">
					<div class="container">
						<div>
							<h1><?= ($h02) ?></h1>
							<p>
								<?= ($t02)."
" ?>
							</p><br>
							<div class="flex three">
								<div><span class="image"><img src="<?= ($i01) ?>"/></span></div>
								<div><span class="image"><img src="<?= ($i02) ?>"/></span></div>
								<div><span class="image"><img src="<?= ($i03) ?>"/></span></div>
							</div>
						</div>
					</div>
				</section>

				<section id="what_we_grow">
					<div class="container">
						<div class="flex two">
							<div class="full"><h1><?= ($h03) ?></h1></div>
							<div class="full"  style="margin-bottom:0.6em">
								<p>
									<?= ($t03)."
" ?>
								</p>
							</div>

							<div class="flex five demo full">
								<div class="full two-fifth-800"><span class="image"><img src="<?= ($i04) ?>"/></span></div>
								<div class="full three-fifth-800 text-padding">
									<p class="centre-photo">
										<h3><?= ($h04) ?></h3>
										<?= ($t04)."
" ?>
									</p>
								</div>
								<div class=" hr-border-up"></div>
							</div>

							<div class="flex five demo full">
								<div class="full two-fifth-800"><span class="image"><img src="<?= ($i05) ?>"/></span></div>
								<div class="full three-fifth-800 text-padding">
									<p class="centre-photo">
										<h3><?= ($h05) ?></h3>
										<?= ($t05)."
" ?>
									</p>
								</div>
								<div class=" hr-border-up"></div>
							</div>
							<div class="flex five demo full">
								<div class="full two-fifth-800"><span class="image"><img src="<?= ($i06) ?>"/></span></div>
								<div class="full three-fifth-800 text-padding">
									<p class="centre-photo">
										<h3><?= ($h06) ?></h3>
										<?= ($t06)."
" ?>
									</p>
								</div>
								<div class=" hr-border-up"></div>
							</div>

							<div class="flex five demo full">
								<div class="full two-fifth-800"><span class="image"><img src="<?= ($i07) ?>"/></span></div>
								<div class="full three-fifth-800 text-padding">
									<p class="centre-photo">
										<h3><?= ($h07) ?></h3>
										<?= ($t07)."
" ?>
									</p>
								</div>
								<div class=" hr-border-up"></div>
							</div>

							<div class="flex five demo full">
								<div class="full two-fifth-800"><span class="image"><img src="<?= ($i08) ?>"/></span></div>
								<div class="full three-fifth-800 text-padding">
									<p class="centre-photo">
										<h3><?= ($h08) ?></h3>
										<?= ($t08)."
" ?>
									</p>
								</div>
							</div>

						</div>
					</div>
				</section>

				<section>
					<div class="container">
						<h1><?= ($h09) ?></h1>
						<p style="text-align: justify; text-justify: auto;">
							<?= ($t09)."
" ?>
							<span class="image max-width-transfer-image"><img src="<?= ($i09) ?>"/></span>
							<?= ($t10)."
" ?>
						</p>
						<br>
					</div>
				</section>

				<section id="lets_introduce">
					<div class="container">
						<h1><?= ($h10) ?></h1>
						<p><?= ($t11) ?></p>
						<!--Send Form 1-->
						<form id="myform" method="post" action="/send/form/to/buy">
							<div class="flex two">
								<div class="full">
									<input type="text" name="name" id="name" placeholder="Ваше ім'я" value="<?= ($name) ?>" required/>
								</div>
								<div class="full">
									<input type="text" name="telephone" maxlength="10" id="telephone" placeholder="Ваш номер телефону" value="<?= ($telephone) ?>" required />
								</div>
								<div class="full">
									<input type="email" name="email" id="email" placeholder="Ваш email" value="<?= ($email) ?>" required/>
								</div>
								<div class="full">
									<textarea name="message" id="message" placeholder="Ваше повідомлення до ферми Карпусь" rows="6" required><?= ($message) ?></textarea>
								</div>
								<div class="full">
									<ul class="actions flex two">
										<li>
											<button class="g-recaptcha"
				          data-sitekey="6Ld8l2UUAAAAADT4hsF5iSsi--ke9Xz8YI9IP-IO" data-callback='sendFormTobuy'>Відправити</button>
										</li>
									</ul>
								</div>
							</div>
							<input type="hidden" id="captcha-response" name="captcha-response" />
						</form>

						<div class="flex">
							<div class="col-6 col-12-xsmall" style="text-align:center;"><p>
								Карпусь<br> Олександр і Олександра<br> господарство<br><br>
								+38 (097) 565-99-22<br>
								(095) 062-54-44<br>
								<span style="color:#00B1FC;"><a href="mailto:farm@karpus.com.ua">farm@karpus.com.ua</a></span>
							</p></div>
							<div class="col-6 col-12-xsmall" style="text-align:center;"><p>
								Балюра<br> Олександр<br> продажі <br><br>
								+38 (067) 564-71-44<br>
								(099) 601-08-08<br>
								<span style="color:#00B1FC;"><a href="mailto:sasha@karpus.com.ua">sasha@karpus.com.ua</a></span>
							</p></div>
							<div class="full">
								<p style="text-align:center;">Дніпропетровська обл. Покровський р-н с. Маломихайлівка  вул. Гоголя, 18-а</p>
							</div>
						</div>
					</div>
				</section>
				<div onclick="console.log(this.style.display = 'none')" class="alert"></div>
			</div>


			<section id="footer">
				<div class="container">
					 Created by <a href="https://www.linkedin.com/in/pilevoid">Dimas Karpus</a>
				</div>
			</section>

		</div>

		<!-- Scripts -->
		<!--you must understand and make it yourself dimas-->
		<script src="/app/assets/js/jquery.min.js"></script>
		<script src="/app/assets/js/jquery.scrollex.min.js"></script><!--
		<script src="/app/assets/js/jquery.scrolly.min.js"></script>-->
		<script src="/app/assets/js/browser.min.js"></script>
		<script src="/app/assets/js/breakpoints.min.js"></script>
		<script src="/app/assets/js/util.js"></script>
		<script src="/app/assets/js/main.js"></script>
		<script src="/app/assets/js/core.js"></script>
		<script type="text/javascript">
			function alertMessage(message){

				if(message!==""){
					switch(message){
						case "0":
							$(".alert").css("background-image","linear-gradient(to bottom, #ff4b30 87%,rgba(255,75,48,0) 100%)");
							$(".alert").css("color","#FFC864");
							$(".alert").text("Телофон має бути введеним у форматі 0950123123");
							$("#telephone").css("background-color","#f55447");
							$(".alert").css("display","block");
							$(".alert").css({height:"5em",paddingTop: "2em"});
							setTimeout(func, 6000);
							break;
						case "1":
							$(".alert").css("background-image","linear-gradient(to bottom, #AFE450 87%,rgba(175,228,80,0) 100%)");
							$(".alert").css("color","#48A0B1");
							$(".alert").text("Форма відправлена, дякуємо! Ми зв'яжемося з Вами протягом 24 годин.");
							$(".alert").css("display","block");
							$(".alert").css({height:"5em",paddingTop: "2em"});
							setTimeout(func, 6000);
							break;
						case "2":
							$(".alert").css("background-image","linear-gradient(to bottom, #ff4b30 87%,rgba(255,75,48,0) 100%)");
							$(".alert").css("color","#FFC864");
							$(".alert").text("Ви не пройшли тест на робота. Спробуйте відправить лист знову");
							$(".alert").css("display","block");
							$(".alert").css({height:"5em",paddingTop: "2em"});
							setTimeout(func, 6000);
							break;
					}
					function func() {
						$(".alert").removeClass("alert-animation");
					  $(".alert").css("display","none");
						$("#telephone").css("background-color","#fff");
					}
				}
			}

			$(function(){
				alertMessage("<?= ($alertMessage) ?>");
			});

			function sendFormTobuy(){
				document.getElementById("myform").submit();
			}
		</script>

	</body>
</html>
