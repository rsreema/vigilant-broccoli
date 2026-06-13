import json
import urllib.request

# Put your GitHub username here
USERNAME = "rsreema"

def get_my_repos():
    # Simple API link to fetch public repos sorted by newest
    api_url = f"https://api.github.com/users/{USERNAME}/repos?sort=updated"
    
    # Standard headers so GitHub doesn't block the request
    request = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
    
    try:
        print("Connecting to GitHub...")
        with urllib.request.urlopen(request) as response:
            all_repos = json.loads(response.read().decode())
            
        my_projects = []
        
        for repo in all_repos:
            # Skip projects that are just clones/forks of other people's work
            if repo['fork']:
                continue
                
            # Figure out the category based on language
            lang = repo.get('language') or 'Design'
            
            if lang in ['HTML', 'CSS', 'JavaScript', 'TypeScript']:
                category = "Web"
            else:
                category = "Code"
                
            # Clean up the repository name (e.g., "my-spotify-clone" -> "My Spotify Clone")
            clean_title = repo['name'].replace('-', ' ').title()
            
            # Use the actual description, or a nice fallback text if it's empty
            description = repo['description'] or "A project built and managed on my GitHub."
            
            # Build a simple dictionary for this project
            project_item = {
                "title": clean_title,
                "description": description,
                "category": category,
                "tech": lang,
                "link": repo['html_url']
            }
            
            my_projects.append(project_item)
            
        # Save everything cleanly into the JSON file
        with open("projects.json", "w") as file:
            json.dump(my_projects, file, indent=4)
            
        print(f"Done! Successfully loaded {len(my_projects)} projects.")
        
    except Exception as error:
        print("Something went wrong:", error)

if __name__ == "__main__":
    get_my_repos()