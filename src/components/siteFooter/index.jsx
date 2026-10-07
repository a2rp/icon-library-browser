import { FaGithub } from "react-icons/fa6";
import {
    LuCode,
    LuGlobe,
    LuHeart,
    LuMail,
    LuUsers,
} from "react-icons/lu";
import styles from "./styles.module.css";

const profileLinks = [
    { label: "Portfolio", href: "https://www.ashishranjan.net", icon: LuGlobe },
    { label: "GitHub", href: "https://github.com/a2rp", icon: FaGithub },
    { label: "CodePen", href: "https://codepen.io/ash1198", icon: LuCode },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aashishranjan", icon: LuUsers },
    { label: "Facebook", href: "https://www.facebook.com/theash.ashish/", icon: LuUsers },
    { label: "YouTube", href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", icon: LuGlobe },
    { label: "Email", href: "mailto:ash.ranjan09@gmail.com", icon: LuMail },
    { label: "Support", href: "https://a2rp-donation-page.netlify.app/", icon: LuHeart },
    { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/ashishranjan", icon: LuHeart },
    { label: "Patreon", href: "https://www.patreon.com/ashishranjan", icon: LuHeart },
];

const SiteFooter = () => (
    <footer className={styles.footer} id="about">
        <div className={styles.footerContent}>
            <div className={styles.copyright}>
                <a
                    className={styles.footerLogo}
                    href="https://www.ashishranjan.net"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Ashish Ranjan portfolio"
                >
                    <img
                        src={`${import.meta.env.BASE_URL}logo.png`}
                        alt="Ashish Ranjan logo"
                    />
                </a>
                <p>
                    © {new Date().getFullYear()} {" "}
                    <a href="https://github.com/a2rp" target="_blank" rel="noreferrer">
                        Ashish Ranjan
                    </a>
                    . All rights reserved.
                </p>
            </div>
            <div className={styles.footerLinks}>
                <a
                    className={styles.sourceLink}
                    href="https://github.com/a2rp/icon-library-browser"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaGithub aria-hidden="true" /> Source code
                </a>
                <nav aria-label="Profile and support links">
                    {profileLinks.map(({ label, href, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith("mailto:") ? undefined : "_blank"}
                            rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                        >
                            <Icon aria-hidden="true" /> {label}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    </footer>
);

export default SiteFooter;
