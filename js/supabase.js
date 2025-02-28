// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.21.0/+esm'

// Initialize Supabase client
const supabaseUrl = 'https://llfspawuyetujfnzgfey.supabase.co' // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZnNwYXd1eWV0dWpmbnpnZmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NTA0NDEsImV4cCI6MjA1NjMyNjQ0MX0.4A-qEeJqZQg5uaz9cBvXwVas5zPkC1MHmhFcQcz9Lro' // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey)

// Function to submit contact form data to Supabase
async function submitContactForm(formData) {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        { 
          first_name: formData.firstName,
          last_name: formData.lastName,
          membership_id: formData.membershipId,
          subject: formData.subject,
          submitted_at: new Date()
        }
      ])
    
    if (error) {
      console.error('Error submitting form:', error)
      return { success: false, message: 'Failed to submit your information. Please try again.' }
    }
    
    return { success: true, message: 'Thank you for your submission! We will contact you soon.' }
  } catch (err) {
    console.error('Exception:', err)
    return { success: false, message: 'An unexpected error occurred. Please try again later.' }
  }
}

// Function to handle form submission
function initContactForm() {
  const contactForm = document.querySelector('form')
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
      event.preventDefault()
      
      const submitButton = document.querySelector('.btn-enq')
      const originalButtonText = submitButton.textContent
      submitButton.textContent = 'Submitting...'
      submitButton.disabled = true
      
      const formData = {
        firstName: document.getElementById('fname').value,
        lastName: document.getElementById('lname').value,
        membershipId: document.getElementById('mid').value,
        subject: document.getElementById('subject').value
      }
      
      const result = await submitContactForm(formData)
      
      // Create and show notification message
      const notification = document.createElement('div')
      notification.className = result.success ? 'notification success' : 'notification error'
      notification.textContent = result.message
      document.querySelector('.contact-container').appendChild(notification)
      
      // Reset form if successful
      if (result.success) {
        contactForm.reset()
      }
      
      // Reset button state
      submitButton.textContent = originalButtonText
      submitButton.disabled = false
      
      // Remove notification after 5 seconds
      setTimeout(() => {
        notification.remove()
      }, 5000)
    })
  }
}

// Initialize the contact form when the DOM is loaded
document.addEventListener('DOMContentLoaded', initContactForm)

export { submitContactForm, initContactForm }