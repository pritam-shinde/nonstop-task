import { Container, Typography, Link } from '@material-ui/core'
import { CopyrightOutlined } from '@ant-design/icons';
const Footer = () => {
    return (
        <>
            <footer className="fixed-bottom">
                <Container className="d-flex justify-content-center align-items-center border-top pt-2" maxWidth="xl">
                    <Typography className="text-white"><CopyrightOutlined />{new Date().getFullYear()} | <Link className="text-white" href="https://nonstopcorp.com/" target="_blank">Nonstop Corporation</Link></Typography>
                </Container>
            </footer>
        </>
    )
}

export default Footer
