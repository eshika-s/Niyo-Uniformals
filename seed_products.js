// seed_products.js - Seeds all products from product.json into Supabase
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  'https://ltvzifseaubefwyazzbr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0dnppZnNlYXViZWZ3eWF6emJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MzcyNTIsImV4cCI6MjA5NTUxMzI1Mn0.scQDEFwtPxvsWO01YzaQXabC3hBL-A8HQCkQCz1ki2s'
)

const IMAGE_MAP = {
  'prod-doctor-male':             ['/images/premium_mens_lab_coat_1781424925528.png'],
  'prod-doctor-female':           ['/images/premium_womens_lab_coat_1781424937311.png'],
  'prod-doctor-2':                ['/images/premium_hospital_ot_scrub_1781424949074.png'],
  'prod-nurse-1':                 ['/images/premium_nurse_tunic_1781424962870.png'],
  'prod-nurse-2':                 ['/images/female_vneck_scrub_1781425001237.png'],
  'prod-patient-1':               ['/images/patient_hospital_gown_1781425011177.png'],
  'prod-patient-2':               ['/images/sterile_sms_gown_1781425025393.png'],
  'prod-medical-apron':           ['/images/surgical_apron_1781425037112.png'],
  'prod-scrub-jogger':            ['/images/scrub_jogger.png'],
  'prod-scrub-pediatric':         ['/images/scrub_pediatric.png'],
  'prod-tunic-dentist':           ['/images/tunic_dentist.png'],
  'prod-staff-wardboy':           ['/images/staff_wardboy.png'],
  'prod-gown-isolation':          ['/images/gown_isolation.png'],
  'prod-doctor-blazer':           ['/images/doctor_blazer.png'],
  'prod-maternity-scrub':         ['/images/maternity_scrub.png'],
  'prod-patient-pajama':          ['/images/patient_pajama.png'],
  'prod-medical-lab-apron':       ['/images/medical_lab_apron.png'],
  'prod-scrub-premium-fit':       ['/images/scrub_premium_fit.png'],
  'prod-female-scrub':            ['/images/female_scrub_set.png'],
  'prod-mens-lab-coat':           ['/images/mens_lab_coat.png'],
  'prod-medical-scrubs':          ['/images/medical_scrubs.png'],
  'prod-ot-scrub':                ['/images/ot_scrub_suit.png'],
  'prod-womens-lab-coat':         ['/images/womens_lab_coat.png'],
  'prod-hospital-gown':           ['/images/unisex_hospital_gown.png'],
  'prod-disposable-gown':         ['/images/disposable_patient_gown.png'],
  'prod-chef-1':                  ['/images/chef_jacket.png'],
  'prod-chef-2':                  ['/images/chef_apron.png'],
  'prod-waiter-1':                ['/images/waiter_vest.png'],
  'prod-waiter-shirt':            ['/images/oxford_shirt.png'],
  'prod-hospitality-coat':        ['/images/hospitality_coat.png'],
  'prod-corporate-1':             ['/images/mens_blazer.png'],
  'prod-corporate-women-blazer':  ['/images/womens_blazer.png'],
  'prod-corporate-2':             ['/images/nehru_jacket.png'],
  'prod-corporate-3':             ['/images/oxford_shirt.png'],
  'prod-corporate-shirt':         ['/images/corporate_shirt.png'],
  'prod-corporate-mens-blazer':   ['/images/corporate_mens_blazer.png'],
  'prod-corporate-womens-blazer': ['/images/corporate_womens_blazer.png'],
  'prod-school-blazer':           ['/images/school_blazer.png'],
  'prod-school-polo':             ['/images/school_polo.png'],
  'prod-school-tracksuit':        ['/images/school_tracksuit.png'],
  'prod-sports-jersey':           ['/images/sports_jersey.png'],
  'prod-industrial-1':            ['/images/industrial_coverall.png'],
}

const CATEGORIES = [
  { id: 'cat-medical',      name: 'Healthcare & Hospital Uniforms',    slug: 'medical',      display_order: 1, is_visible: true },
  { id: 'cat-hospitality',  name: 'Hotel & Hospitality Uniforms',       slug: 'hospitality',  display_order: 2, is_visible: true },
  { id: 'cat-corporate',    name: 'Corporate (Suits, Blazers, Shirts)', slug: 'corporate',    display_order: 3, is_visible: true },
  { id: 'cat-school',       name: 'School & College Uniforms',          slug: 'school',       display_order: 4, is_visible: true },
  { id: 'cat-sports',       name: 'Sports & Athletic Uniforms',         slug: 'sports',       display_order: 5, is_visible: true },
  { id: 'cat-industrial',   name: 'Industrial & Safety Uniforms',       slug: 'industrial',   display_order: 6, is_visible: true },
  { id: 'cat-advocate',     name: 'Advocate & Legal Uniforms',          slug: 'advocate',     display_order: 7, is_visible: true },
  { id: 'cat-convocation',  name: 'Convocation & Academic Gowns',       slug: 'convocation',  display_order: 8, is_visible: true },
]

async function seed() {
  console.log('🌱 Starting database seed...\n')

  // 1. Seed categories
  console.log('📁 Seeding categories...')
  const { error: catError } = await supabase
    .from('categories')
    .upsert(CATEGORIES, { onConflict: 'id' })

  if (catError) {
    console.error('Category error:', catError.message)
    return
  }
  console.log(`✅ ${CATEGORIES.length} categories seeded\n`)

  // 2. Load and seed products
  console.log('📦 Seeding products...')
  const raw = readFileSync('./product.json', 'utf-8')
  const products = JSON.parse(raw)

  let successCount = 0
  let errorCount = 0

  for (const p of products) {
    // Assign images from map, or keep existing non-empty images
    const images = (p.images && p.images.length > 0) 
      ? p.images 
      : (IMAGE_MAP[p.id] || [])

    const { categories, ...productData } = p // remove nested categories object

    const row = {
      ...productData,
      images,
    }

    const { error } = await supabase
      .from('products')
      .upsert(row, { onConflict: 'id' })

    if (error) {
      console.error(`  ✗ ${p.id}: ${error.message}`)
      errorCount++
    } else {
      const imgStatus = images.length > 0 ? `✅` : `⚠️  (no image)`
      console.log(`  ${imgStatus} ${p.id} — ${p.name.substring(0, 45)}`)
      successCount++
    }
  }

  console.log(`\n📊 Done!`)
  console.log(`  ✅ Seeded: ${successCount} products`)
  console.log(`  ✗  Errors: ${errorCount} products`)
}

seed()
