// fix_images.js - Run with: node fix_images.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ltvzifseaubefwyazzbr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0dnppZnNlYXViZWZ3eWF6emJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MzcyNTIsImV4cCI6MjA5NTUxMzI1Mn0.scQDEFwtPxvsWO01YzaQXabC3hBL-A8HQCkQCz1ki2s'
)

// Map product IDs to their local image paths
const IMAGE_MAP = {
  // Medical
  'prod-doctor-male':         ['/images/premium_mens_lab_coat_1781424925528.png'],
  'prod-doctor-female':       ['/images/premium_womens_lab_coat_1781424937311.png'],
  'prod-doctor-2':            ['/images/premium_hospital_ot_scrub_1781424949074.png'],
  'prod-nurse-1':             ['/images/premium_nurse_tunic_1781424962870.png'],
  'prod-nurse-2':             ['/images/female_vneck_scrub_1781425001237.png'],
  'prod-patient-1':           ['/images/patient_hospital_gown_1781425011177.png'],
  'prod-patient-2':           ['/images/sterile_sms_gown_1781425025393.png'],
  'prod-medical-apron':       ['/images/surgical_apron_1781425037112.png'],
  'prod-scrub-jogger':        ['/images/scrub_jogger.png'],
  'prod-scrub-pediatric':     ['/images/scrub_pediatric.png'],
  'prod-tunic-dentist':       ['/images/tunic_dentist.png'],
  'prod-staff-wardboy':       ['/images/staff_wardboy.png'],
  'prod-gown-isolation':      ['/images/gown_isolation.png'],
  'prod-doctor-blazer':       ['/images/doctor_blazer.png'],
  'prod-maternity-scrub':     ['/images/maternity_scrub.png'],
  'prod-patient-pajama':      ['/images/patient_pajama.png'],
  'prod-medical-lab-apron':   ['/images/medical_lab_apron.png'],
  'prod-scrub-premium-fit':   ['/images/scrub_premium_fit.png'],
  'prod-female-scrub':        ['/images/female_scrub_set.png'],
  'prod-mens-lab-coat':       ['/images/mens_lab_coat.png'],
  'prod-medical-scrubs':      ['/images/medical_scrubs.png'],
  'prod-ot-scrub':            ['/images/ot_scrub_suit.png'],
  'prod-womens-lab-coat':     ['/images/womens_lab_coat.png'],
  'prod-hospital-gown':       ['/images/unisex_hospital_gown.png'],
  'prod-disposable-gown':     ['/images/disposable_patient_gown.png'],

  // Hospitality
  'prod-chef-1':              ['/images/chef_jacket.png'],
  'prod-chef-2':              ['/images/chef_apron.png'],
  'prod-waiter-1':            ['/images/waiter_vest.png'],
  'prod-hospitality-coat':    ['/images/hospitality_coat.png'],

  // Corporate
  'prod-corporate-1':         ['/images/mens_blazer.png'],
  'prod-corporate-women-blazer': ['/images/womens_blazer.png'],
  'prod-corporate-2':         ['/images/nehru_jacket.png'],
  'prod-corporate-3':         ['/images/oxford_shirt.png'],
  'prod-corporate-shirt':     ['/images/corporate_shirt.png'],
  'prod-corporate-mens-blazer': ['/images/corporate_mens_blazer.png'],
  'prod-corporate-womens-blazer': ['/images/corporate_womens_blazer.png'],

  // School
  'prod-school-blazer':       ['/images/school_blazer.png'],
  'prod-school-polo':         ['/images/school_polo.png'],
  'prod-school-tracksuit':    ['/images/school_tracksuit.png'],

  // Sports
  'prod-sports-jersey':       ['/images/sports_jersey.png'],

  // Industrial
  'prod-industrial-1':        ['/images/industrial_coverall.png'],
}

async function fixImages() {
  console.log('Fetching all products from Supabase...')
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, images')

  if (error) {
    console.error('Error fetching products:', error.message)
    return
  }

  console.log(`Found ${products.length} products\n`)
  let updated = 0
  let skipped = 0

  for (const product of products) {
    const newImages = IMAGE_MAP[product.id]

    if (!newImages) {
      console.log(`⚠️  No image mapping for: ${product.id} (${product.name})`)
      skipped++
      continue
    }

    // Only update if images are missing/empty
    const currentImages = product.images || []
    if (currentImages.length > 0 && currentImages[0].startsWith('/images/')) {
      console.log(`✓  Already has local images: ${product.id}`)
      skipped++
      continue
    }

    const { error: updateError } = await supabase
      .from('products')
      .update({ images: newImages })
      .eq('id', product.id)

    if (updateError) {
      console.error(`✗  Failed to update ${product.id}:`, updateError.message)
    } else {
      console.log(`✅ Updated ${product.id} → ${newImages[0]}`)
      updated++
    }
  }

  console.log(`\n📊 Done! Updated: ${updated}, Skipped: ${skipped}`)
}

fixImages()
