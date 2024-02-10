# Example usage:
if __name__ == "__main__":
    # Load the encrypted data from the file
    with open('/content/encrypted.bin', 'rb') as file:
        loaded_encrypted_data = file.read()

    # Decrypt the data
    decrypted_data = decrypt_data(loaded_encrypted_data)

    # Take user input for search term
    search_text = input("Enter the search term: ")

    # Perform case-insensitive text search on the decrypted data
    search_result = dictionary_search(decrypted_data, search_text)

    # Print the results or "Not Found"
    if search_result:
        for result in search_result:
            print(f"Term: {result['term']}, Definition: {result['definition']}")
    else:
        handle_not_found(search_text)