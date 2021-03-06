import { Component, OnInit } from '@angular/core';
import { Location,  PopStateEvent } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import * as $ from "jquery";
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    login: string;
    password: string;

    index = sessionStorage.getItem("slider-number") ? Number(sessionStorage.getItem("slider-number")) : 1;
    imgItem = "/assets/img/slider-auth/" + this.index + ".jpg";
    informations: string[] = [
        "Les 10 meilleurs conseils de sécurité pour le Bitcoin",
        "Les 13 règles de l’investisseur dans Bitcoin et les cryptomonnaies",
        "Le plus grand chandelier sur 1 heure pour Bitcoin (BTC) depuis le Black" +
        "Thursday : Bitcoin a fait une chute d’environ 1 500 USD, en moins de 15 min aujourd’hui, 10 mai 2020.",
        "Le Bitcoin ne profite pas vraiment du «halving», pour l'instant",
        "Le prix du Bitcoin va-t-il s'envoler après le 3ème «halving» de son histoire ?\nlacements "
    ];
    information = this.informations[this.index];

    changeImg() {
        setTimeout(() => {
            this.index = this.index + 1;
            if (this.index == 6) {
                this.index = 1;
            }
            this.imgItem = "/assets/img/slider-auth/" + this.index + ".jpg";
            this.information = this.informations[this.index];
            sessionStorage.setItem("slider-number", this.index.toString());
            this.changeImg();
        }, 10000);
    }

    constructor(public location: Location, private router: Router,private toastr: ToastrService,
        private userService: UserService) {
        if (this.userService.isLoginIn()) {
            this.router.navigate(["/mes-titres"]);
        }
    }
    public loading = true;
    on_login=false;

    ngOnInit() {
        if (this.userService.isLoginIn()) {
            this.router.navigate(["/mes-titres"]);
        }
        this.changeImg();
        const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
            // if we are on windows OS we activate the perfectScrollbar function

            document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
        } else {
            document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
        }
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                if (event.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (event instanceof NavigationEnd) {
                if (event.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });

        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
        }

        const window_width = $(window).width();
        let $sidebar = $('.sidebar');
        let $sidebar_responsive = $('body > .navbar-collapse');
        let $sidebar_img_container = $sidebar.find('.sidebar-background');


        if (window_width > 767) {
            if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
                $('.fixed-plugin .dropdown').addClass('open');
            }

        }

        $('.fixed-plugin a').click(function (event) {
            // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
            if ($(this).hasClass('switch-trigger')) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                else if (window.event) {
                    window.event.cancelBubble = true;
                }
            }
        });

        $('.fixed-plugin .badge').click(function () {
            let $full_page_background = $('.full-page-background');


            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            var new_color = $(this).data('color');

            if ($sidebar.length !== 0) {
                $sidebar.attr('data-color', new_color);
            }

            if ($sidebar_responsive.length != 0) {
                $sidebar_responsive.attr('data-color', new_color);
            }
        });

        $('.fixed-plugin .img-holder').click(function () {
            let $full_page_background = $('.full-page-background');

            $(this).parent('li').siblings().removeClass('active');
            $(this).parent('li').addClass('active');


            var new_image = $(this).find("img").attr('src');

            if ($sidebar_img_container.length != 0) {
                $sidebar_img_container.fadeOut('fast', function () {
                    $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
                    $sidebar_img_container.fadeIn('fast');
                });
            }

            if ($full_page_background.length != 0) {

                $full_page_background.fadeOut('fast', function () {
                    $full_page_background.css('background-image', 'url("' + new_image + '")');
                    $full_page_background.fadeIn('fast');
                });
            }

            if ($sidebar_responsive.length != 0) {
                $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
            }
        });
    }
    ngAfterViewInit() {
        this.runOnRouteChange();
    }
    isMaps(path) {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        if (path == titlee) {
            return false;
        }
        else {
            return true;
        }
    }
    runOnRouteChange(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
            const ps = new PerfectScrollbar(elemMainPanel);
            ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }
    seConnecter() {
        this.loading=true;
        this.on_login=true;
        this.userService.loginUserByLoginAndPassword(this.login, this.password).subscribe(data => {
            sessionStorage.setItem("user_access", JSON.stringify(data));
            this.loading=false;
            this.toastr.success('Bienvenue','Authentification');
            if(this.userService.isAdmin()){
                this.router.navigate(["/my-titres"]);
              }
              else{
                this.router.navigate(["/mes-titres"]);
              }
            
            this.on_login=false;
        },err=>{
            console.log(err)
            this.on_login=false;
            this.toastr.error('Impossible de se connecter, veuillez vérifier vos identifiants','Authentification');
        })


    }

}
