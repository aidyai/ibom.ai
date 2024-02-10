import json
import re
from pathlib import Path

def load_json_file(file_path: Path):
    with open(file_path, 'r', encoding='utf-8') as file:
        json_data = json.load(file)
    return json_data

def search_(query, json_file_path):
    json_data = load_json_file(json_file_path)

    results = []

    # Convert the query to lowercase for case-insensitive search
    query = query.lower()

    for entry in json_data:
        term = entry['WORD']['term'].lower()

        # Check if 'definitions' key exists and is not None
        if 'definitions' in entry['WORD'] and entry['WORD']['definitions'] is not None:
            # Create a list to store definitions
            definitions_list = []

            # Iterate over all definitions
            for definition_key, definition_value in entry['WORD']['definitions'].items():
                definition = definition_value.lower()

                # Search for the query in both the term and the definition
                if re.search(query, term) or re.search(query, definition):
                    definitions_list.append(definition)

            # Check if any definitions were found
            if definitions_list:
                results.append({
                    'term': entry['WORD']['term'],
                    'pos': entry['WORD']['pos'],
                    'definitions': definitions_list,
                    'related_terms': entry['WORD']['related-terms'],
                })

    return results