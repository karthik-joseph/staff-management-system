class CacheControlMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Add cache control headers
        response['Cache-Control'] = 'max-age=86400, public'  # Cache for 24 hours
        
        # You can set different cache policies for different URLs
        if request.path.startswith('/static/'):
            response['Cache-Control'] = 'max-age=31536000, public'  # Cache static files for 1 year
        
        # For AJAX or API calls, you might want to prevent caching
        if request.path.startswith('/api/') or request.is_ajax():
            response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
            response['Pragma'] = 'no-cache'
            response['Expires'] = '0'
            
        return response
