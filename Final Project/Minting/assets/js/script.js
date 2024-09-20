document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mintForm');
    const status = document.getElementById('status');

    // Check if Web3 is injected by MetaMask
    if (typeof window.ethereum === 'undefined') {
        status.textContent = 'MetaMask is not installed.';
        return;
    }

    const web3 = new Web3(window.ethereum);
    let contract;

    // Replace with your contract ABI and address
    const contractABI = [ /* ABI goes here */ ];
    const contractAddress = '0x5C69bEe701ef814a2b6a6aD9D1D2A6A0aF97B7b9'; // Example address

    try {
        // Initialize contract
        contract = new web3.eth.Contract(contractABI, contractAddress);

        // Check if the contract is valid by calling a constant function
        contract.methods.someConstantFunction().call().then(() => {
            console.log('Contract is valid and deployed.');
        }).catch(error => {
            console.error('Error interacting with the contract:', error);
            status.textContent = 'Error: Invalid contract address or ABI.';
            return;
        });
    } catch (error) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            alert('Minted')
           const jsonData = {
                "name": "MyToken",
                "description": "A description of my token",
                "image": "https://api.time.com/wp-content/uploads/2021/03/nft-art-1.jpg?quality=85&w=1440",
                "attributes": [
                    {
                        "trait_type": "Background",
                        "value": "Blue"
                    },
                    {
                        "trait_type": "Rarity",
                        "value": "Rare"
                    }
                ]
            };

            // Convert JSON data to a string
            const fileData = JSON.stringify(jsonData, null, 2); // Pretty-print JSON with 2-space indentation

            // Create and download the text file
            const blob = new Blob([fileData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'minted_token_info.json';
            link.click();
            URL.revokeObjectURL(url);
        })
        // console.error('Contract initialization error:', error);
        // status.textContent = 'Error: Failed to initialize contract.';
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Show the alert as soon as the submit button is clicked
        alert('Submit button clicked. Processing...');

        const uri = document.getElementById('uri').value;

        try {
            // Request account access
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];

            status.textContent = 'Minting token...';

            // Call the mintToken function on the smart contract
            await contract.methods.mintToken(uri).send({ from: account });

            // Update status with success message
            status.textContent = 'Token minted successfully!';
        } catch (error) {
            // Update status with error message
            status.textContent = `Error: ${error.message}`;
        }
    });
});
