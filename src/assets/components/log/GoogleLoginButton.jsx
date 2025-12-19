import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const GoogleLoginButton = () => {
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {
        const idToken = credentialResponse.credential;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.token) localStorage.setItem("token", data.token);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));

                    const event = new CustomEvent("userUpdated", { detail: data.user });
                    window.dispatchEvent(event);
                }
                navigate("/");
            } else {
                alert(data.message || "Connexion Google échouée");
            }
        } catch (error) {
            console.error("Erreur Google Auth:", error);
            alert("Connexion Google échouée");
        }
    };

    const handleError = () => {
        alert("Connexion Google échouée");
    };

    return (
        <div className="google-login-container" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                width="100%"
                theme="filled_blue"
                text="signin_with"
                shape="rectangular"
                locale="fr"
            />
        </div>
    );
};

export default GoogleLoginButton;
