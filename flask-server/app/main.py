from flask_app import create_app

app = create_app()  # Create the app instance

if __name__ == "__main__":
    app.run(debug=True)  # Run the app in debug mode

# 0655c76a196150d00995c8ba7eb5f196b0b69c3b62eee2077c0d7fce4d7bc7c7