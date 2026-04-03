function Footer() {
    return (<footer className="bg-green-900 text-white text-center p-3 text-sm">
        © 2026 RideFlow Rentals. All rights reserved.
        <div className="flex gap-5 justify-center py-3">
            <a href="https://facebook.com">
                <img src="images/fblogo.png" alt="FacebookLink" className="h-7 w-7" />
            </a>
            <a href="https://instagram.com">
                <img src="images/iglogo.png" alt="instagramLink" className="h-7 w-7" />
            </a>
            <a href="https://x.com">
                <img src="images/xlogo.png" alt="xLink" className="h-7 w-7" />
            </a>
            <a href="https://tiktok.com">
                <img src="images/Tiktok_icon.svg.png" alt="tiktokLink" className="h-7 w-7" />
            </a>
        </div>
    </footer>
    );
}
export default Footer;