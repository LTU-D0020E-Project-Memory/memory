<?php

namespace Drupal\dn_statistics\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Database\Database;
use Drupal\Core\Url;
use Drupal\Core\Routing;

/**
 * Provides the form for adding countries.
 */
class StatsForm extends FormBase {
    /**
     * {@inheritdoc}
     */
    public function getFormId() {
        return 'dn_statistic_form';
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(array $form, FormStateInterface $form_state) {
        $form['user'] = [
            '#type' => 'textfield',
            '#title' => $this->t('user'),
            '#required' => TRUE,
            '#maxlength' => 1000000,
        ];
        $form['time'] = [
            '#type' => 'textfield',
            '#title' => $this->t('time'),
            '#required' => TRUE,
            '#maxlength' => 1000000,
        ];
        $form['tries'] = [
            '#type' => 'textfield',
            '#title' => $this->t('tries'),
            '#required' => TRUE,
            '#maxlength' => 1000000,
        ];
        $form['hints'] = [
            '#type' => 'textfield',
            '#title' => $this->t('hints'),
            '#required' => TRUE,
            '#maxlength' => 1000000,
        ];
        $form['size'] = [
            '#type' => 'textfield',
            '#title' => $this->t('size'),
            '#required' => TRUE,
            '#maxlength' => 1000000,
        ];

        $form['actions']['#type'] = 'actions';
        $form['actions']['submit'] = [
            '#type' => 'submit',
            '#button_type' => 'primary',
            '#default_value' => $this->t('Save') ,
        ];

        return $form;
    }
  
    /**
    * {@inheritdoc}
    */
    public function validateForm(array & $form, FormStateInterface $form_state) {
        $field = $form_state->getValues();
        
        $fields["fname"] = $field['fname'];
        if (!$form_state->getValue('fname') || empty($form_state->getValue('fname'))) {
            $form_state->setErrorByName('fname', $this->t('Provide First Name'));
        }
    }

    /**
     * {@inheritdoc}
     */
    public function submitForm(array & $form, FormStateInterface $form_state) {
        try {
            $conn = Database::getConnection();
            
            $field = $form_state->getValues();
        
            $fields["user"]  = $field['user'];
            $fields["time"]  = $field['time'];
            $fields["tries"] = $field['tries'];
            $fields["hints"] = $field['hints'];
            $fields["size"]  = $field['size'];
            
            $conn->insert('statistics')
                ->fields($fields)->execute();
            \Drupal::messenger()->addMessage($this->t('The data has been successfully saved'));	 
        }
        
        catch(Exception $ex) {
            \Drupal::logger('dn_statistics')->error($ex->getMessage());
        }
    }
}