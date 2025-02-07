import '../styles.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return(
        <footer className='footer'>
            ©{currentYear} Moviedux, All right reserved.
        </footer>
    )
}
